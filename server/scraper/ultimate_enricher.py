import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import pymongo
import google.generativeai as genai
from dotenv import load_dotenv
import json
import time
import re

# 1. SETUP & CONFIGURATION
# Load .env from server/
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

MONGO_URI = os.getenv('DATABASE_URL')
GEMINI_KEY = os.getenv('GEMINI_API_KEY')

if not MONGO_URI or not GEMINI_KEY:
    print("CRITICAL ERROR: DATABASE_URL or GEMINI_API_KEY missing in .env")
    exit(1)

# Initialize Database
client = pymongo.MongoClient(MONGO_URI)
db = client.get_default_database()
colleges_col = db['colleges']

# Initialize AI
genai.configure(api_key=GEMINI_KEY)

def get_working_model():
    """Finds a Gemini model with Search Tool support."""
    names = ["gemini-1.5-flash-latest", "gemini-1.5-flash", "gemini-2.0-flash"]
    for name in names:
        try:
            print(f"   > Testing Model: {name}")
            # Use 'google_search' as the tool name
            m = genai.GenerativeModel(model_name=name, tools=[{"google_search": {}}])
            m.generate_content("test")
            print(f"   > SUCCESS! Using Model: {name}")
            return m
        except Exception as e:
            print(f"   ! Model {name} failed: {e}")
            continue
    return genai.GenerativeModel(model_name="gemini-1.5-flash")


model = get_working_model()

# 2. PROMPT & TEMPLATE
# The structure as requested by the user from blank.json
ENRICH_TEMPLATE = {
    "about": "",
    "establishedYear": "",
    "managementType": "",
    "admissionProcess": "",
    "avgPackage": "",
    "highestPackage": "",
    "address": "",
    "city": "",
    "district": "",
    "state": "",
    "pincode": "",
    "contactDetails": {"phone": "", "email": ""},
    "cutOffs": "",
    "facilities": [],
    "faq": [{"question": "", "answer": ""}],
    "fees": "",
    "mapLink": "",
    "officialWebsite": "",
    "photos": [],
    "ranking": "",
    "resultInfo": "",
    "scholarships": "",
    "studentLife": "",
    "topRecruiters": [],
    "videos": [],
    "commuteIntelligence": [{"type": "airport/railway/bus", "hubName": "", "travelTime": ""}]
}


def enrich_college_data(name, state):
    print(f"\n[+] Enriching: \"{name}\" ({state})")
    
    prompt = f"""
    Using your Google Search tool, find the most accurate and up-to-date information for the college: "{name}, {state}, India".
    Return the result EXACTLY as a raw JSON object following this template (no markdown, no extra text):
    {json.dumps(ENRICH_TEMPLATE, indent=2)}

    CONSTRAINTS:
    - Return ONLY the JSON object.
    - 'officialWebsite': find the real official .ac.in or .edu.in or .org website.
    - 'address': find the full registered postal address.
    - 'mapLink': find a working Google Maps embed URL (usually starts with https://www.google.com/maps/embed?pb=...).
    - 'photos': find 5 high-quality campus image URLs.
    - 'videos': find 2 youtube embed/watch links.
    - 'facilities': list 5-10 key facilities.
    - 'faq': provide 3 commonly asked questions and answers.
    - 'fees': provide a brief summary of fees for major courses.
    - 'topRecruiters': find 10 companies that visit this campus.
    - 'commuteIntelligence': find the nearest airport, railway station, and bus terminal with travel time.
    """

    
    for retry in range(2):
        try:
            response = model.generate_content(prompt)
            text = response.text.strip()
            
            # Extract JSON from potential markdown/extra text
            json_match = re.search(r'\{.*\}', text, re.DOTALL)
            if json_match:
                try:
                    enriched_data = json.loads(json_match.group())
                    
                    # Standardize youtube links
                    if 'videos' in enriched_data:
                        enriched_data['videos'] = [
                            v.replace('watch?v=', 'embed/') if 'youtube.com' in v and 'watch?v=' in v else v
                            for v in enriched_data['videos']
                            if v # Ensure not empty
                        ]
                    
                    return enriched_data
                except json.JSONDecodeError:
                    print(f"   ! JSON Decode Error. AI returned invalid JSON.")
            else:
                print(f"   ! JSON not found in response: {text[:200]}...")
                
        except Exception as e:
            if "429" in str(e):
                print(f"   ! Quota hit. Waiting 60s...")
                time.sleep(60)
                continue
            print(f"   ! Error during enrichment: {e}")
            break
            
    return None

# 3. MAIN LOOP
def run_ultimate_enricher(batch_size=10):
    # Only pick colleges that are not yet enriched (e.g., about is missing)
    query = {
        "$or": [
            {"about": {"$exists": False}}, 
            {"about": ""},
            {"officialWebsite": {"$exists": False}},
            {"officialWebsite": ""}
        ]
    }
    
    # Priority for RCC specifically
    rcc_target = colleges_col.find_one({"name": {"$regex": "RCC INSTITUTE", "$options": "i"}})
    if rcc_target:
        print("--- PRIORITY: ENRICHING RCC IIT ---")
        data = enrich_college_data(rcc_target['name'], rcc_target.get('state', 'West Bengal'))
        if data:
            colleges_col.update_one({"_id": rcc_target["_id"]}, {"$set": data})
            print("   >>> SUCCESS: RCC Updated.")
    
    total = colleges_col.count_documents(query)
    print(f"\n--- TOTAL COLLEGES ENRICHMENT NEEDED: {total} ---")
    
    # Batch processing
    batch = list(colleges_col.find(query).limit(batch_size))
    for college in batch:
        if "RCC INSTITUTE" in college['name']: continue
        
        data = enrich_college_data(college['name'], college.get('state', ''))
        if data:
            # Add timestamp
            data['updates'] = {
                "lastUpdated": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
            }
            
            colleges_col.update_one({"_id": college["_id"]}, {"$set": data})
            print(f"   >>> UPDATED: {college['name']}")
        else:
            print(f"   > SKIPPED: Failed to enrich.")
        
        time.sleep(15) # Rate limit safety

if __name__ == "__main__":
    run_ultimate_enricher(50) 
