import json
import os
import re
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
DATABASE_URL = os.getenv('DATABASE_URL')

def clean_name(name):
    """Normalize name for comparison: lowercase, no non-alphanumeric chars, no spacers."""
    # Remove brackets content
    name = re.sub(r'\[.*?\]', '', name)
    # To lowercase
    name = name.lower()
    # Remove extra spaces and punctuation
    name = re.sub(r'[^a-z0-9]', ' ', name)
    # Remove common fillers
    fillers = {'of', 'and', 'the', 'in', 'at', 'institute', 'college', 'engineering', 'technology', 'university', 'research'}
    words = [w for w in name.split() if w not in fillers and len(w) > 1]
    return " ".join(words)

def sync_data():
    client = MongoClient(DATABASE_URL)
    db = client.get_default_database()
    col = db['colleges']

    with open('listing_results.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Pre-fetch all college names from DB for fuzzy matching (efficient for small pilot)
    print("Fetching college list from DB...")
    db_colleges = list(col.find({}, {"name": 1, "_id": 1}))
    
    updated_count = 0
    for entry in data:
        target_name = clean_name(entry['name'])
        if not target_name: continue
        
        matches = []
        for db_c in db_colleges:
            db_name_cleaned = clean_name(db_c['name'])
            # Check if all words in target_name are in db_name_cleaned or vice versa
            target_words = set(target_name.split())
            db_words = set(db_name_cleaned.split())
            
            # Intersection score
            if target_words.issubset(db_words) or db_words.issubset(target_words):
                matches.append(db_c)

        if matches:
            # Pick the one with the closest name length or just the first for now
            college = matches[0]
            updates = {}
            if entry['avg_placement'] != "—":
                updates["avgPackage"] = entry['avg_placement']
            if entry['highest_placement'] != "—":
                updates["highestPackage"] = entry['highest_placement']
            
            fee_val = entry['fees']
            if fee_val != "—":
                col.update_one(
                    {"_id": college["_id"]},
                    {"$set": updates | {"courses.$[elem].fees": fee_val}},
                    array_filters=[{"elem.fees": {"$in": ["", "—", "-", "Check Website", "N/A", None]}}]
                )
                if updates:
                    col.update_one({"_id": college["_id"]}, {"$set": updates})
            elif updates:
                col.update_one({"_id": college["_id"]}, {"$set": updates})
                
            print(f"  ✓ Closest Match: '{entry['name']}' -> '{college['name']}'")
            updated_count += 1
        else:
            print(f"  ✗ No Match for: {entry['name']}")

    print(f"\nSync complete. Re-processed {updated_count} out of {len(data)} colleges.")
    client.close()

if __name__ == "__main__":
    sync_data()
