import os
import time
import re
from collections import Counter
from pymongo import MongoClient
from dotenv import load_dotenv
from googlesearch import search
import wikipediaapi

# Load env
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
DATABASE_URL = os.getenv('DATABASE_URL')

wiki = wikipediaapi.Wikipedia(
    user_agent='CollegeReviewzScraper/1.0 (anish@example.com)',
    language='en'
)

def extract_year(text):
    if not text:
        return []
    # match 18xx, 19xx, 20xx
    matches = re.findall(r'\b((?:18|19|20)\d{2})\b', text)
    return matches

def extract_year_from_text(text):
    years = extract_year(text)
    if not years:
        return None
    valid_years = [y for y in years if 1800 <= int(y) <= 2026]
    if not valid_years:
        return None
    
    # Simple heuristic: often the first year mentioned in a summary is the founding year
    counts = Counter(valid_years)
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
    missing_colleges = list(colleges_collection.find(query).limit(5))
    print(f"Found {len(missing_colleges)} colleges in pilot batch missing Estd.")
    
    success_count = 0
    for college in missing_colleges:
        name = college.get('name', '')
        state = college.get('state', '')
        search_query = f'{name} {state} wikipedia'
        
        print(f"\nSearching for: {name} in {state}")
        
        try:
            # Get top google hit
            results = list(search(search_query, num_results=3, sleep_interval=2))
            
            print(f"  -> URLs found: {results}")
            
            wiki_title = None
            for url in results:
                if 'wikipedia.org/wiki/' in url:
                    wiki_title = url.split('/')[-1]
                    break
            
            if wiki_title:
                page = wiki.page(wiki_title)
                if page.exists():
                    year = extract_year_from_text(page.summary)
                    if year:
                        print(f"  -> Found year from Wikipedia: {year}")
                        colleges_collection.update_one(
                            {"_id": college["_id"]},
                            {"$set": {"establishedYear": year}}
                        )
                        success_count += 1
                    else:
                        print("  -> Could not reliably determine year from Wikipedia summary.")
                else:
                    print("  -> Wikipedia page not found.")
            else:
                # Fallback to general search results parsing if we want to
                print("  -> No Wikipedia page found in top results.")
                
            time.sleep(2) # be gentle
        except Exception as e:
            print(f"  -> Error searching: {e}")
            time.sleep(5)
            
    print(f"\nPilot done! Successfully updated {success_count}/{len(missing_colleges)} colleges.")

if __name__ == "__main__":
    main()
