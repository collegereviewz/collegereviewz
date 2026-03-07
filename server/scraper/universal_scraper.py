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

# Load configuration
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

MONGO_URI = os.getenv('DATABASE_URL')
GEMINI_KEY = os.getenv('GEMINI_API_KEY')

# Initialize AI with Search Tool
genai.configure(api_key=GEMINI_KEY)
# Initialize AI with Search Tool
genai.configure(api_key=GEMINI_KEY)

def init_model():
    model_names = ["models/gemini-2.0-flash", "models/gemini-flash-latest", "gemini-2.0-flash"]
    for name in model_names:
        try:
            print(f"   > Testing model: {name}")
            m = genai.GenerativeModel(
                model_name=name,
                tools=[{"google_search": {}}]
            )
            m.generate_content("test")
            return m
        except Exception as e:
            print(f"   ! Tool init failed for {name}: {e}")
            try:
                m = genai.GenerativeModel(model_name=name)
                m.generate_content("test")
                return m
            except:
                pass
    return genai.GenerativeModel(model_name="gemini-2.0-flash")

model = init_model()



# Initialize Database
client = pymongo.MongoClient(MONGO_URI)
db = client.get_default_database()
colleges_col = db['colleges']

def standardize_youtube_url(url):
    # Standardize to embed format
    if 'youtu.be' in url:
        return f"https://www.youtube.com/embed/{url.split('/')[-1]}"
    if 'watch?v=' in url:
        match = re.search(r'v=([^&]+)', url)
        if match: return f"https://www.youtube.com/embed/{match.group(1)}"
    if 'embed/' in url: return url
    return url

def get_media_for_college(name, state):
    print(f"\n[+] Processing: {name}")
    
    prompt = f"""
    Find 5 PUBLICLY ACCESSIBLE campus photo URLs and 3 WORKING YouTube tour links for: "{name}, {state}, India".
    IMPORTANT: 
    1. Avoid official website links that block hotlinking (403 errors). 
    2. Prefer links from Unsplash, Wikimedia, Google User Photos, or highly reliable public hubs.
    3. Ensure YouTube links are in 'https://www.youtube.com/watch?v=VIDEO_ID' format.
    
    Return ONLY a JSON object:
    {{
        "photos": ["url1", "url2", ...],
        "videos": ["url1", "url2", ...]
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        json_match = re.search(r'\{.*\}', text, re.DOTALL)
        if json_match:
            data = json.loads(json_match.group())
            photos = data.get('photos', [])
            videos = [standardize_youtube_url(v) for v in data.get('videos', [])]
            return photos, videos
    except Exception as e:
        print(f"   ! AI Error: {e}")
    return [], []

def run_universal_scraper(batch_size=10):
    query = {
        "$or": [
            {"photos": {"$exists": False}}, {"photos": {"$size": 0}},
            {"videos": {"$exists": False}}, {"videos": {"$size": 0}}
        ]
    }
    
    total = colleges_col.count_documents(query)
    print(f"--- Universal Media Scraper Starting for {total} colleges ---")
    
    # Process RCC first to fix the user's issue
    rcc = colleges_col.find_one({'name': {'$regex': 'RCC INSTITUTE OF INFORMATION', '$options': 'i'}})
    if rcc:
        p, v = get_media_for_college(rcc['name'], rcc.get('state', 'West Bengal'))
        if p or v:
            colleges_col.update_one({'_id': rcc['_id']}, {'$set': {'photos': p, 'videos': v, 'updates.lastUpdated': time.strftime('%Y-%m-%d')}})
            print(f"   > RCC Updated successfully.")

    # Continue with batch
    cursor = colleges_col.find(query).limit(batch_size)
    for college in cursor:
        if "RCC" in college['name']: continue # Skip RCC as handled
        p, v = get_media_for_college(college['name'], college.get('state', ''))
        if p or v:
            colleges_col.update_one({'_id': college['_id']}, {'$set': {'photos': p, 'videos': v, 'updates.lastUpdated': time.strftime('%Y-%m-%d')}})
            print(f"   > Updated {college['name']} with {len(p)} photos.")
        time.sleep(3) # Throttle

if __name__ == "__main__":
    run_universal_scraper(10)
