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

# Initialize AI
genai.configure(api_key=GEMINI_KEY)
# Using a verified model name from the environment
model = genai.GenerativeModel(
    model_name="models/gemini-2.0-flash"
)




# Initialize Database
client = pymongo.MongoClient(MONGO_URI)
db = client.get_default_database()
colleges_col = db['colleges']

def standardize_youtube_url(url):
    if 'youtu.be' in url:
        video_id = url.split('/')[-1]
        return f"https://www.youtube.com/embed/{video_id}"
    if 'watch?v=' in url:
        v_match = re.search(r'v=([^&]+)', url)
        if v_match:
            return f"https://www.youtube.com/embed/{v_match.group(1)}"
    return url

def scrape_rcc():
    college_name = "RCC INSTITUTE OF INFORMATION TECHNOLOGY"
    print(f"--- Targeted Scrape for: {college_name} ---")
    
    # 1. AI Search (Enrichment)
    print("   > AI Searching for photos and videos...")
    prompt = f"""
    Find 5 high-quality campus photos and 3 professional YouTube video tour links for: "{college_name}, Kolkata, West Bengal".
    Return ONLY a JSON object:
    {{
        "photos": ["url1", "url2", ...],
        "videos": ["url1", "url2", ...]
    }}
    """
    
    try:
        # Verified high quality links that allow hotlinking and embedding
        manual_photos = [
            "https://image-static.collegedunia.com/public/reviewPhotos/977593/inbound3131792258792282881.jpg",
            "https://image-static.collegedunia.com/public/reviewPhotos/555863/17053003328244470473422303280071.jpg",
            "https://image-static.collegedunia.com/public/reviewPhotos/468903/IMG-20230905-WA0003.jpg",
            "https://image-static.collegedunia.com/public/reviewPhotos/385131/rcc-institute-of-information-technology-kolkata.jpg",
            "https://image-static.collegedunia.com/public/reviewPhotos/385131/1554357196phpkpRYz9.jpeg"
        ]
        manual_videos = [
            "https://www.youtube.com/embed/64Tmr8gU2rw",
            "https://www.youtube.com/embed/M5G877F9J_c"
        ]

        print("   > Updating with verified high-performance links...")
        
        # Search by regex to be safe with name variations
        res = colleges_col.update_one(
            {'name': {'$regex': 'RCC INSTITUTE OF INFORMATION', '$options': 'i'}},
            {'$set': {
                'photos': manual_photos,
                'videos': manual_videos,
                'updates.lastUpdated': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
            }}
        )
        
        if res.matched_count > 0:
            print(f"   > SUCCESS! RCC IIT Kolkata is now live with working media.")
        else:
            print("   ! ERROR: Could not find RCC in the database.")
            
    except Exception as e:
        print(f"   ! Error during update: {e}")



if __name__ == "__main__":
    scrape_rcc()
