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
    """Finds the best available Gemini model in this environment."""
    names = [
        "models/gemini-2.0-flash", 
        "models/gemini-2.0-flash-001",
        "models/gemini-1.5-flash",
        "gemini-2.0-flash"
    ]
    for name in names:
        try:
            print(f"   > Testing Model: {name}")
            # Enable Search Tool only if the model supports it
            m = genai.GenerativeModel(model_name=name, tools=[{"google_search": {}}])
            m.generate_content("test")
            print(f"   > SUCCESS! Using Model: {name}")
            return m
        except Exception as e:
            print(f"   ! Model {name} failed: {e}")
            continue
    
    print("   ! WARNING: No search-enabled models found. Using basic model.")
    return genai.GenerativeModel(model_name="models/gemini-2.0-flash")

model = get_working_model()

# 2. UTILS
def standardize_youtube(url):
    """Converts any YouTube link to its clean embed format."""
    if not url: return ""
    video_id = ""
    if 'youtu.be/' in url:
        video_id = url.split('youtu.be/')[1].split('?')[0]
    elif 'v=' in url:
        video_id = url.split('v=')[1].split('&')[0]
    elif 'embed/' in url:
        video_id = url.split('embed/')[1].split('?')[0]
    
    return f"https://www.youtube.com/embed/{video_id}" if video_id else url

def is_hotlink_safe(url):
    """Checks if an image URL is likely to block hotlinking (403)."""
    # Prefer these domains
    safe_domains = ['collegedunia.com', 'wikimedia.org', 'unsplash.com', 'googleusercontent.com', 'shiksha.com']
    if any(d in url.lower() for d in safe_domains):
        return True
    
    # Official college sites often block hotlinking
    if '.ac.in' in url or '.edu.in' in url:
        return False
    
    return True

# 3. CORE LOGIC
def find_media_with_ai(name, state):
    """Uses Gemini to find professional, hotlink-safe campus media."""
    print(f"\n[+] Searching: {name} ({state})")
    
    prompt = f"""
    Find 5 high-quality, professional campus photos and 3 YouTube video tours for: "{name}, {state}, India".
    
    IMAGE REQUIREMENTS:
    - Use public CDN links (e.g., from search results on Collegedunia, Shiksha, Wikimedia) that allow hotlinking.
    - Avoid .ac.in or .edu.in official sites (they often return 403 Forbidden).
    
    VIDEO REQUIREMENTS:
    - YouTube links only (Drone views or Campus tours preferred).
    
    Return ONLY a raw JSON object:
    {{
        "photos": ["link1", "link2", ...],
        "videos": ["link1", "link2", ...]
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        
        # Clean JSON string
        json_match = re.search(r'\{.*\}', text, re.DOTALL)
        if json_match:
            data = json.loads(json_match.group())
            
            # Post-process
            final_photos = [p for p in data.get('photos', []) if is_hotlink_safe(p)]
            final_videos = [standardize_youtube(v) for v in data.get('videos', [])]
            
            return final_photos[:6], final_videos[:3]
    except Exception as e:
        if "429" in str(e):
            print("   ! [QUOTA]: 429 Resource Exhausted. Sleeping for 45s...")
            time.sleep(45)
            # Recursive retry once
            return find_media_with_ai(name, state)
        print(f"   ! AI Error: {e}")
        time.sleep(5)
    return [], []

def run_mega_scraper(batch_size=20):
    """Processes colleges missing media in batches."""
    query = {
        "$or": [
            {"photos": {"$exists": False}}, {"photos": {"$size": 0}},
            {"videos": {"$exists": False}}, {"videos": {"$size": 0}}
        ]
    }
    
    total_needed = colleges_col.count_documents(query)
    print(f"\n--- MEGA MEDIA SCRAPER: {total_needed} Colleges Remaining ---")
    
    while True:
        # Sort by recently added or just grab next batch
        batch = list(colleges_col.find(query).limit(batch_size))
        if not batch:
            print("FINISHED: All colleges have media!")
            break
            
        for college in batch:
            name = college['name']
            state = college.get('state', 'India')
            
            photos, videos = find_media_with_ai(name, state)
            
            if photos or videos:
                colleges_col.update_one(
                    {'_id': college['_id']},
                    {'$set': {
                        'photos': photos,
                        'videos': videos,
                        'updates.lastUpdated': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
                    }}
                )
                print(f"   >>> UPDATED: {name}")
                print(f"       Photos: {len(photos)}, Videos: {len(videos)}")
            else:
                print(f"   > SKIPPED: Media not found for {name}")
            
            # 6 second delay to stay under ~10 RPM for Free Tier safety
            time.sleep(6) 

if __name__ == "__main__":
    run_mega_scraper(50)

