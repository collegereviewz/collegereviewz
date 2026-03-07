import os
import time
import re
from collections import Counter
from pymongo import MongoClient
from dotenv import load_dotenv
from duckduckgo_search import DDGS

# Load env
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
DATABASE_URL = os.getenv('DATABASE_URL')

def extract_year(text):
    if not text:
        return []
    # match 18xx, 19xx, 20xx
    matches = re.findall(r'\b((?:18|19|20)\d{2})\b', text)
    return matches

def get_most_common_year(results):
    all_years = []
    for r in results:
        all_years.extend(extract_year(r.get('body', '')))
        all_years.extend(extract_year(r.get('title', '')))
    
    if not all_years:
        return None
    
    # filter out unlikely years (current year or future) 
    # and strictly keep between 1800 and 2026
    valid_years = [y for y in all_years if 1800 <= int(y) <= 2026]
    if not valid_years:
        return None
        
    counts = Counter(valid_years)
    # Return the most frequently mentioned year
    most_common = counts.most_common(1)
    if most_common:
        return most_common[0][0]
    return None

def main():
    print("Connecting to DB...")
    client = MongoClient(DATABASE_URL)
    db = client.get_default_database()
    colleges_collection = db['colleges']

    # Find missing
    query = {
        "$or": [
            {"establishedYear": {"$exists": False}},
            {"establishedYear": "—"},
            {"establishedYear": ""}
        ]
    }
    
    # Process only a pilot batch first
    missing_colleges = list(colleges_collection.find(query).limit(20))
    print(f"Found {len(missing_colleges)} colleges in pilot batch missing Estd.")
    
    ddgs = DDGS()
    
    success_count = 0
    for college in missing_colleges:
        name = college.get('name', '')
        state = college.get('state', '')
        search_query = f'"{name}" "{state}" established year founder history'
        
        print(f"\nSearching for: {name} in {state}")
        
        try:
            results = list(ddgs.text(search_query, max_results=5))
            year = get_most_common_year(results)
            
            if year:
                print(f"  -> Found year: {year}")
                colleges_collection.update_one(
                    {"_id": college["_id"]},
                    {"$set": {"establishedYear": year}}
                )
                success_count += 1
            else:
                print("  -> Could not reliably determine year.")
                
            time.sleep(2) # be gentle with the search API
        except Exception as e:
            print(f"  -> Error searching: {e}")
            time.sleep(5)
            
    print(f"\nPilot done! Successfully updated {success_count}/{len(missing_colleges)} colleges.")

if __name__ == "__main__":
    main()
