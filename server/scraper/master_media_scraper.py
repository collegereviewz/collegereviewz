import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import pymongo
import google.generativeai as genai
from dotenv import load_dotenv
import json
import time

# Load configuration
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

MONGO_URI = os.getenv('DATABASE_URL')
GEMINI_KEY = os.getenv('GEMINI_API_KEY')

if not MONGO_URI or not GEMINI_KEY:
    print("CRITICAL: DATABASE_URL or GEMINI_API_KEY missing in .env")
    exit(1)

# Initialize AI and DB
genai.configure(api_key=GEMINI_KEY)
db_client = pymongo.MongoClient(MONGO_URI)
db = db_client.get_default_database()
colleges = db['colleges']

def get_website_assets(url):
    """Scrapes images and youtube videos from the college website."""
    try:
        print(f"   > Crawling: {url}")
        headers = {'User-Agent': 'Mozilla/5.0'}
        res = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(res.text, 'html.parser')
        
        imgs = []
        vids = []

        for i in soup.find_all('img'):
            src = i.get('src')
            if src and any(ext in src.lower() for ext in ['.jpg', '.jpeg', '.png']):
                if 'logo' not in src.lower():
                    imgs.append(urljoin(url, src))
        
        for f in soup.find_all('iframe'):
            src = f.get('src')
            if src and 'youtube' in src:
                vids.append(src if src.startswith('http') else 'https:' + src)
                
        return list(set(imgs))[:8], list(set(vids))[:4]
    except:
        return [], []

def ai_enrich_media(name, state, scraped_imgs, scraped_vids):
    """Uses Gemini to filter and find professional campus media."""
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = f"""
        Provide professional campus photos and official YouTube videos for "{name}, {state}".
        Verify these scraped links: {scraped_imgs[:2]}
        
        Return ONLY JSON:
        {{
            "photos": ["link1", "link2", "link3", "link4"],
            "videos": ["youtube_link1", "youtube_link2"]
        }}
        """
        response = model.generate_content(prompt)
        text = response.text.replace('```json', '').replace('```', '').strip()
        return json.loads(text)
    except Exception as e:
        print(f"   ! AI Error: {e}")
        return {"photos": scraped_imgs, "videos": scraped_vids}

def start_scraping():
    query = {
        "$or": [
            {"photos": {"$exists": False}},
            {"photos": {"$size": 0}},
            {"videos": {"$exists": False}},
            {"videos": {"$size": 0}}
        ]
    }
    
    total = colleges.count_documents(query)
    print(f"--- Starting Final Scraper for {total} Colleges ---")

    while True:
        batch = list(colleges.find(query).limit(20))
        if not batch:
            print("Done! All colleges updated.")
            break

        for college in batch:
            name = college['name']
            state = college.get('state', 'India')
            site = college.get('officialWebsite')
            
            print(f"\n[+] Processing: {name}")
            
            s_imgs, s_vids = [], []
            if site:
                s_imgs, s_vids = get_website_assets(site)
            
            final = ai_enrich_media(name, state, s_imgs, s_vids)
            
            colleges.update_one(
                {'_id': college['_id']},
                {'$set': {
                    'photos': final.get('photos', []),
                    'videos': final_media.get('videos', []) if 'final_media' in locals() else final.get('videos', []),
                    'updates.lastUpdated': time.strftime('%Y-%m-%d')
                }}
            )
            print(f"   > Updated with {len(final.get('photos', []))} photos and {len(final.get('videos', []))} videos.")
            time.sleep(4) # Rate limit protection

if __name__ == "__main__":
    start_scraping()
