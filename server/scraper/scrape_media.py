import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import pymongo
from bson import ObjectId
import google.generativeai as genai
from dotenv import load_dotenv
import json
import time
import re

# Load env from server/.env
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

# Configuration
MONGO_URI = os.getenv('DATABASE_URL')
GEMINI_KEY = os.getenv('GEMINI_API_KEY')

if not MONGO_URI or not GEMINI_KEY:
    print("Error: DATABASE_URL or GEMINI_API_KEY not found in .env")
    exit(1)

# Initialize AI with SEARCH TOOL explicitly enabled
genai.configure(api_key=GEMINI_KEY)

# Initialize Database
try:
    client = pymongo.MongoClient(MONGO_URI)
    db = client.get_default_database()
    colleges_col = db['colleges']
except Exception as e:
    print(f"Database connection error: {e}")
    exit(1)

# Try to find a working model
def get_model():
    # Names to try. Flash 2.0 is preferred, then Flash 1.5.
    model_names = [
        "gemini-2.0-flash", 
        "gemini-1.5-flash",
        "gemini-2.0-flash-001",
        "gemini-1.5-flash-latest",
        "gemini-2.0-flash-exp",
        "models/gemini-2.0-flash",
        "models/gemini-1.5-flash"
    ]
    
    for name in model_names:
        try:
            print(f"Testing Gemini model: {name}...")
            # We try to initialize and run a simple tool-enabled prompt
            m = genai.GenerativeModel(
                model_name=name,
                tools=[{"google_search": {}}]
            )
            # Short test
            m.generate_content("test")
            print(f"   > SUCCESS: Using {name}")
            return m
        except Exception as e:
            print(f"   ! Model {name} failed: {e}")
            # Try without tools as a fallback
            try:
                print(f"   ! Testing {name} without search tools...")
                m = genai.GenerativeModel(model_name=name)
                m.generate_content("test")
                print(f"   > SUCCESS: Using {name} (NO SEARCH TOOLS)")
                return m
            except:
                pass
    
    # Absolute fallback
    print("WARNING: Falling back to legacy gemini-1.5-flash.")
    return genai.GenerativeModel(model_name="gemini-1.5-flash")

model = get_model()





def is_valid_url(url):
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except:
        return False

def scrape_media_from_url(url):
    print(f"Scraping website: {url}")
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        images = []
        videos = []

        # 1. Scrape Images (filter out small icons, logos usually have 'logo' in class/id/src)
        for img in soup.find_all("img"):
            src = img.get("src")
            if src:
                full_url = urljoin(url, src)
                # Basic filter: ignore very small strings or known icon patterns
                if any(ext in full_url.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                    if 'logo' not in full_url.lower() and 'icon' not in full_url.lower():
                        if full_url not in images:
                            images.append(full_url)

        # 2. Scrape Hosted Videos
        for video in soup.find_all("video"):
            src = video.get("src")
            if not src:
                source_tag = video.find("source")
                if source_tag:
                    src = source_tag.get("src")
            
            if src:
                full_url = urljoin(url, src)
                if full_url not in videos:
                    videos.append(full_url)

        # 3. Scrape YouTube Embeds
        for iframe in soup.find_all("iframe"):
            src = iframe.get("src")
            if src and ("youtube.com" in src or "youtu.be" in src):
                # Clean up youtube URL
                if src.startswith('//'):
                    src = 'https:' + src
                if src not in videos:
                    videos.append(src)

        return list(set(images))[:10], list(set(videos))[:5]
    except Exception as e:
        print(f"Failed to scrape {url}: {e}")
        return [], []

def use_gemini_to_enrich(college_name, scraped_images, scraped_videos, state):
    """
    Uses Gemini 1.5 Flash with Google Search to find extra professional media.
    """
    print(f"   > AI Searching for: {college_name} in {state}")
    
    # Try gemini-1.5-flash (most stable for tools)
    try:
        # Note: We don't initialize the model inside the function repeatedly to avoid overhead,
        # but we handle the tool configuration here.
        prompt = f"""
        Search for high-quality campus photos and YouTube tour videos for: "{college_name}, {state}, India".
        
        Website links (verify if relevant): {scraped_images[:2]}
        
        Requirements:
        1. Find 4-6 high-quality image URLs (campus buildings, classrooms, library).
        2. Find 2-3 YouTube video URLs (campus tour, college life, or reviews).
        
        Return ONLY a JSON object:
        {{
            "photos": ["url1", "url2", ...],
            "videos": ["url1", "url2", ...]
        }}
        """
        
        # Use the global model initialized with search tools
        response = model.generate_content(prompt)
        text = response.text.strip()
        
        # Extract JSON from potential markdown code blocks
        json_match = re.search(r'\{.*\}', text, re.DOTALL)
        if json_match:
            data = json.loads(json_match.group())
            # Basic validation
            if not data.get('photos') and not data.get('videos'):
                return None
            
            # Standardize youtube links
            if 'videos' in data:
                data['videos'] = [standardize_youtube_url(v) for v in data['videos']]
                
            return data
        return None
    except Exception as e:
        if "429" in str(e):
            print("   ! Rate limit reached. Sleeping for 30s...")
            time.sleep(30)
        else:
            print(f"   ! Gemini enrichment error: {e}")
        return None

def process_college(college):
    college_id = college['_id']
    name = college['name']
    website = college.get('officialWebsite')
    state = college.get('state', 'India')

    print(f"\n--- Processing: {name} ---")
    
    s_photos, s_videos = [], []
    if website and is_valid_url(website):
        s_photos, s_videos = scrape_media_from_url(website)
    
    final_media = use_gemini_to_enrich(name, s_photos, s_videos, state)
    
    # IMPORTANT: Only update if we actually got something from AI or Scraping
    if final_media and (final_media.get('photos') or final_media.get('videos')):
        colleges_col.update_one(
            {'_id': college_id},
            {
                '$set': {
                    'photos': final_media.get('photos', []),
                    'videos': final_media.get('videos', []),
                    'updates.lastUpdated': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
                }
            }
        )
        print(f"   > SUCCESS: Added {len(final_media.get('photos', []))} photos and {len(final_media.get('videos', []))} videos.")
    else:
        print(f"   > SKIPPED: No valid media found for {name}. Will retry later.")


def run_mega_batch(batch_size=50):
    """
    Continually processes colleges until the whole database is covered.
    """
    total_processed = 0
    query = {
        "$or": [
            {"photos": {"$exists": False}},
            {"photos": {"$size": 0}},
            {"videos": {"$exists": False}},
            {"videos": {"$size": 0}}
        ]
    }
    
    total_needed = colleges_col.count_documents(query)
    print(f"Total colleges needing media: {total_needed}")

    while True:
        colleges = colleges_col.find(query).limit(batch_size)
        batch_list = list(colleges)
        
        if not batch_list:
            print("All colleges processed!")
            break

        for college in batch_list:
            try:
                process_college(college)
                total_processed += 1
                # 5s delay to strictly stay under Gemini RPM limits for the 2.0/1.5 tier
                time.sleep(5)
            except Exception as e:
                print(f"Error in main loop: {e}")
        
        print(f"Batch completed. Total processed so far: {total_processed}/{total_needed}")

if __name__ == "__main__":
    import sys
    # Default batch size or take from args
    size = int(sys.argv[1]) if len(sys.argv) > 1 else 50
    run_mega_batch(size)

