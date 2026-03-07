import json
import os
import re
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
DATABASE_URL = os.getenv('DATABASE_URL')

def clean_name(name):
    name = re.sub(r'\[.*?\]', '', name)
    name = name.lower()
    name = re.sub(r'[^a-z0-9]', ' ', name)
    fillers = {'of', 'and', 'the', 'in', 'at', 'institute', 'college', 'engineering', 'technology', 'university', 'research'}
    words = [w for w in name.split() if w not in fillers and len(w) > 1]
    return " ".join(words)

def sync_data():
    client = MongoClient(DATABASE_URL)
    db = client.get_default_database()
    col = db['colleges']

    results_file = 'universal_results.json'
    if not os.path.exists(results_file):
        print("Results file not found.")
        return

    with open(results_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"Syncing {len(data)} colleges from universal results...")
    
    # Pre-fetch all college names for matching
    db_colleges = list(col.find({}, {"name": 1, "_id": 1}))
    
    updated_count = 0
    for entry in data:
        target_name = clean_name(entry['name'])
        if not target_name: continue
        
        matches = []
        target_words = set(target_name.split())
        for db_c in db_colleges:
            db_name_cleaned = clean_name(db_c['name'])
            db_words = set(db_name_cleaned.split())
            if target_words.issubset(db_words) or db_words.issubset(target_words):
                matches.append(db_c)

        if matches:
            college = matches[0]
            updates = {}
            if entry['avg_placement'] != "—":
                updates["avgPackage"] = entry['avg_placement']
            if entry['highest_placement'] != "—":
                updates["highestPackage"] = entry['highest_placement']
            
            fee_val = entry['fees']
            if fee_val != "—":
                # Special cases for 4-year programs vs annual fees
                # Aggregator often shows total fees for some and first-year for others
                # For now, we store as provided but can be refined later
                col.update_one(
                    {"_id": college["_id"]},
                    {"$set": updates | {"courses.$[elem].fees": fee_val}},
                    array_filters=[{"elem.fees": {"$in": ["", "—", "-", "Check Website", "N/A", None]}}]
                )
                if updates:
                    col.update_one({"_id": college["_id"]}, {"$set": updates})
            elif updates:
                col.update_one({"_id": college["_id"]}, {"$set": updates})
            updated_count += 1
            if updated_count % 50 == 0:
                print(f"  Processed {updated_count} matches...")

    print(f"\nBulk sync complete. Updated {updated_count} colleges.")
    client.close()

if __name__ == "__main__":
    sync_data()
