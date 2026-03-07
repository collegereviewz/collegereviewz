import json
import os
import re
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
DATABASE_URL = os.getenv('DATABASE_URL')

def sync_data():
    client = MongoClient(DATABASE_URL)
    db = client.get_default_database()
    colleges_col = db['colleges']

    with open('listing_results.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"Syncing {len(data)} colleges...")

    updated_count = 0
    for entry in data:
        raw_name = entry['name']
        # Clean name for matching (remove brackets and extra spaces)
        clean_name = re.sub(r'\[.*?\]', '', raw_name).split('-')[0].strip()
        
        # Try to find the college by name (case-insensitive regex)
        query = {"name": {"$regex": f"^{re.escape(clean_name)}", "$options": "i"}}
        college = colleges_col.find_one(query)

        if college:
            updates = {}
            if entry['avg_placement'] != "—":
                updates["avgPackage"] = entry['avg_placement']
            if entry['highest_placement'] != "—":
                updates["highestPackage"] = entry['highest_placement']
            
            # Apply fees to all courses if they don't have it or have placeholders
            fee_val = entry['fees']
            if fee_val != "—":
                # Update courses array
                colleges_col.update_one(
                    {"_id": college["_id"]},
                    {"$set": updates | {"courses.$[elem].fees": fee_val}},
                    array_filters=[{"elem.fees": {"$in": ["", "—", "-", "Check Website", None]}}]
                )
                # Also update if no specific course matches were found but updates exist
                if updates:
                    colleges_col.update_one({"_id": college["_id"]}, {"$set": updates})
            elif updates:
                colleges_col.update_one({"_id": college["_id"]}, {"$set": updates})
            
            print(f"  ✓ Updated: {college['name']}")
            updated_count += 1
        else:
            print(f"  ✗ Not found in DB: {clean_name}")

    print(f"\nSync complete. Updated {updated_count} out of {len(data)} colleges.")
    client.close()

if __name__ == "__main__":
    sync_data()
