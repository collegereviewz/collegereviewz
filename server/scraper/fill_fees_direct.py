"""
fill_fees_direct.py - fetch fee data from CollegeDunia search directly
Run: python fill_fees_direct.py
"""
import os, re, time, json
from collections import Counter
from pymongo import MongoClient
from dotenv import load_dotenv
import requests
from bs4 import BeautifulSoup

load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
DATABASE_URL = os.getenv('DATABASE_URL')

BATCH_LIMIT = 20
SLEEP = 4
LOG_FILE = "fill_fees_direct_log.json"

HEADERS = {
    'User-Agent': (
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
        'AppleWebKit/537.36 (KHTML, like Gecko) '
        'Chrome/122.0.0.0 Safari/537.36'
    ),
    'Accept-Language': 'en-IN,en;q=0.9',
}

FEE_PATTERN  = re.compile(r'(?:₹|rs\.?|inr)\s*([\d,]+(?:\.\d+)?)', re.IGNORECASE)
LAKH_PATTERN = re.compile(r'([\d.]+)\s*(?:lakh|lac)', re.IGNORECASE)

def extract_fees(text):
    vals = []
    for m in FEE_PATTERN.finditer(text):
        try:
            v = int(float(m.group(1).replace(',', '')))
            if 5_000 <= v <= 50_00_000: vals.append(v)
        except: pass
    for m in LAKH_PATTERN.finditer(text):
        try:
            v = int(float(m.group(1)) * 1_00_000)
            if 10_000 <= v <= 50_00_000: vals.append(v)
        except: pass
    return vals

def format_fee(val):
    s = str(val)
    if len(s) <= 3: return f'₹{s}'
    last3 = s[-3:]
    rest = s[:-3]
    parts = []
    while len(rest) > 2:
        parts.insert(0, rest[-2:]); rest = rest[:-2]
    if rest: parts.insert(0, rest)
    return '₹' + ','.join(parts) + ',' + last3

def search_collegedunia(college_name, state):
    """Search CollegeDunia for the college and return its page URL."""
    slug = re.sub(r'[^a-zA-Z0-9\s]', '', college_name.lower())
    slug = '-'.join(slug.split()[:8])
    search_url = f'https://collegedunia.com/colleges?q={requests.utils.quote(college_name)}'
    try:
        resp = requests.get(search_url, headers=HEADERS, timeout=10)
        if resp.status_code != 200:
            return None
        soup = BeautifulSoup(resp.text, 'html.parser')
        # Look for links to college detail pages
        links = soup.find_all('a', href=True)
        for link in links:
            href = link.get('href', '')
            if '/colleges/' in href and href.endswith('-fees') or '/colleges/' in href:
                full = f'https://collegedunia.com{href}' if href.startswith('/') else href
                if 'collegedunia.com/colleges/' in full:
                    return full
        return None
    except Exception as e:
        print(f"  search error: {e}")
        return None


def fetch_fees_from_page(url):
    """Fetch a page and extract fee amounts."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        if resp.status_code != 200:
            return []
        soup = BeautifulSoup(resp.text, 'html.parser')
        for s in soup(['script', 'style']): s.decompose()
        return extract_fees(soup.get_text(separator=' '))
    except Exception as e:
        print(f"  fetch error: {e}")
        return []


def get_fee_from_shiksha(college_name, state):
    """Try to get fees via Shiksha search API."""
    q = f'{college_name} {state} fees'.replace(' ', '+')
    url = f'https://www.shiksha.com/college/search?q={requests.utils.quote(college_name)}'
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        if resp.status_code == 200:
            soup = BeautifulSoup(resp.text, 'html.parser')
            for s in soup(['script', 'style']): s.decompose()
            return extract_fees(soup.get_text())
    except:
        pass
    return []


def main():
    print("Connecting to MongoDB …")
    client = MongoClient(DATABASE_URL)
    col = client.get_default_database()['colleges']

    pipeline = [
        {"$match": {
            "courses": {"$exists": True, "$ne": []},
            "$expr": {
                "$gt": [
                    {"$size": {
                        "$filter": {
                            "input": "$courses",
                            "as": "c",
                            "cond": {"$or": [
                                {"$not": ["$$c.fees"]},
                                {"$in": ["$$c.fees", ["", "—", "-", None]]}
                            ]}
                        }
                    }}, 0
                ]
            }
        }},
        {"$project": {"_id": 1, "name": 1, "state": 1, "courses": 1}},
        {"$limit": BATCH_LIMIT}
    ]

    colleges = list(col.aggregate(pipeline))
    print(f"Processing {len(colleges)} colleges …\n")

    updated = skipped = 0
    log = []

    for college in colleges:
        name  = college.get('name', '')
        state = (college.get('state', '') or '').split('(')[0].strip()
        print(f"\n{name[:65]}")

        all_vals = []

        # Try CollegeDunia search page
        cd_url = search_collegedunia(name, state)
        if cd_url:
            print(f"  → {cd_url[:80]}")
            all_vals += fetch_fees_from_page(cd_url)
            time.sleep(1)

        # Try Shiksha
        if not all_vals:
            all_vals += get_fee_from_shiksha(name, state)
            time.sleep(1)

        entry = {"name": name, "found_vals": all_vals[:15]}
        log.append(entry)

        if all_vals:
            counts = Counter(all_vals)
            tv, tf = counts.most_common(1)[0]
            fee_str = format_fee(tv)
            print(f"  ✓  {fee_str}  (x{tf})")
            col.update_one(
                {"_id": college["_id"]},
                {"$set": {"courses.$[elem].fees": fee_str}},
                array_filters=[{"elem.fees": {"$in": ["", "—", "-", None]}}]
            )
            updated += 1
        else:
            print(f"  ✗  no fee data")
            skipped += 1

        time.sleep(SLEEP)

    with open(LOG_FILE, 'w', encoding='utf-8') as f:
        json.dump(log, f, indent=2, ensure_ascii=False)

    print(f"\n{'─'*50}")
    print(f"Done. Updated: {updated}  |  Skipped: {skipped}")

if __name__ == '__main__':
    main()
