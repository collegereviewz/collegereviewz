"""
fill_estd_wiki.py - fill missing establishedYear using Wikipedia API
python fill_estd_wiki.py
"""
import os, time, re
from pymongo import MongoClient
from dotenv import load_dotenv
import wikipediaapi

load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
DATABASE_URL = os.getenv('DATABASE_URL')

wiki = wikipediaapi.Wikipedia(
    user_agent='CollegeReviewz/1.0',
    language='en'
)

BATCH = 200
SLEEP = 1

ESTABLISHED_PATTERNS = [
    r'(?:established|founded|established in|founded in)[^\d]*(\b(?:18|19|20)\d{2}\b)',
    r'\b(?:18|19|20)\d{2}\b',
]

def get_founding_year(text):
    if not text: return None
    # Prefer "established in XXXX" or "founded in XXXX"
    for pat in ESTABLISHED_PATTERNS[:-1]:
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            yr = m.group(1)
            if 1800 <= int(yr) <= 2026:
                return yr
    # Fallback: first year in text
    m = re.search(r'\b((?:18|19|20)\d{2})\b', text)
    if m:
        yr = m.group(1)
        if 1800 <= int(yr) <= 2026:
            return yr
    return None

def try_wiki_titles(name, state):
    """Try several Wikipedia page title variants."""
    state_clean = state.split('(')[0].strip().title()
    name_title = name.title()

    candidates = [
        name_title,
        f"{name_title}, {state_clean}",
        name_title.replace(' And ', ' ').replace(' Of ', ' '),
    ]
    for title in candidates:
        page = wiki.page(title)
        if page.exists():
            year = get_founding_year(page.summary)
            if year:
                return year
    return None

def main():
    print("Connecting …")
    client = MongoClient(DATABASE_URL)
    col = client.get_default_database()['colleges']

    missing = list(col.find({
        "$or": [
            {"establishedYear": {"$exists": False}},
            {"establishedYear": {"$in": ["—", "", "-", "undefined", None]}}
        ]
    }, {"_id": 1, "name": 1, "state": 1}).limit(BATCH))

    print(f"Processing {len(missing)} colleges …\n")
    updated = skipped = 0

    for college in missing:
        name  = college.get('name', '')
        state = college.get('state', '') or ''

        year = try_wiki_titles(name, state)

        if year:
            col.update_one({"_id": college["_id"]}, {"$set": {"establishedYear": year}})
            updated += 1
            print(f"  ✓  {name[:55]:55s} → {year}")
        else:
            skipped += 1
            print(f"  ✗  {name[:55]:55s}")

        time.sleep(SLEEP)

    print(f"\nDone. Updated: {updated}  |  Skipped: {skipped}")

if __name__ == '__main__':
    main()
