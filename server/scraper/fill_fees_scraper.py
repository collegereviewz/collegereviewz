"""
fill_fees_scraper.py  –  fetch fee data by scraping CollegeDunia search results

Approach:
1. Search DuckDuckGo for: <college name> fees site:collegedunia.com OR site:shiksha.com
2. Fetch that page's HTML
3. Extract fee amounts using regex on the raw HTML (much richer than snippets)
4. Update MongoDB colleges[].fees

Run:  python fill_fees_scraper.py
"""
import os, re, time, json
from collections import Counter
from pymongo import MongoClient
from dotenv import load_dotenv
from duckduckgo_search import DDGS
import requests
from bs4 import BeautifulSoup

load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
DATABASE_URL = os.getenv('DATABASE_URL')

BATCH_LIMIT  = 30
SLEEP        = 3
LOG_FILE     = "fill_fees_scraper_log.json"

HEADERS = {
    'User-Agent': (
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
        'AppleWebKit/537.36 (KHTML, like Gecko) '
        'Chrome/120.0.0.0 Safari/537.36'
    )
}

# ─── Fee patterns ──────────────────────────────────────────────────────────────
# Match: ₹8,82,500 / Rs. 1,20,000 / INR 50000 / 8.5 lakhs
FEE_PATTERN  = re.compile(r'(?:₹|rs\.?|inr)\s*([\d,]+(?:\.\d+)?)', re.IGNORECASE)
LAKH_PATTERN = re.compile(r'([\d.]+)\s*(?:lakh|lac)', re.IGNORECASE)

def extract_fees_from_text(text):
    vals = []
    for m in FEE_PATTERN.finditer(text):
        try:
            v = int(float(m.group(1).replace(',', '')))
            if 5_000 <= v <= 50_00_000:
                vals.append(v)
        except: pass
    for m in LAKH_PATTERN.finditer(text):
        try:
            v = int(float(m.group(1)) * 1_00_000)
            if 10_000 <= v <= 50_00_000:
                vals.append(v)
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

def fetch_page_fees(url):
    """Fetch a URL and extract fee values from the text content."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        if resp.status_code != 200:
            return []
        soup = BeautifulSoup(resp.text, 'html.parser')
        # Remove scripts/styles
        for s in soup(['script', 'style']): s.decompose()
        text = soup.get_text(separator=' ')
        return extract_fees_from_text(text)
    except Exception as e:
        print(f"    fetch error: {e}")
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

    ddgs = DDGS()
    updated = skipped = 0
    log = []

    for college in colleges:
        name  = college.get('name', '')
        state = (college.get('state', '') or '').split('(')[0].strip()
        short = ' '.join(name.split()[:5])
        q = f'{short} {state} fees site:collegedunia.com OR site:shiksha.com OR site:careers360.com'
        print(f"\n{name[:60]} [{state}]")

        try:
            results = list(ddgs.text(q, max_results=4))
            all_vals = []

            for r in results:
                url = r.get('href', '')
                if url and any(x in url for x in ['collegedunia', 'shiksha', 'careers360']):
                    print(f"  fetching: {url[:80]}")
                    page_vals = fetch_page_fees(url)
                    all_vals += page_vals
                    time.sleep(1)

            entry = {"name": name, "found_vals": all_vals[:10]}
            log.append(entry)

            if all_vals:
                counts = Counter(all_vals)
                top_val, top_freq = counts.most_common(1)[0]
                if top_freq >= 2:
                    fee_str = format_fee(top_val)
                    print(f"  ✓  {fee_str}  (x{top_freq})")
                    col.update_one(
                        {"_id": college["_id"]},
                        {"$set": {"courses.$[elem].fees": fee_str}},
                        array_filters=[{"elem.fees": {"$in": ["", "—", "-", None]}}]
                    )
                    updated += 1
                else:
                    print(f"  ✗  low confidence — top: {format_fee(top_val)} x{top_freq}")
                    skipped += 1
            else:
                print("  ✗  no fee data found on pages")
                skipped += 1

            time.sleep(SLEEP)

        except Exception as e:
            print(f"  ! Error: {e}")
            skipped += 1
            time.sleep(5)

    with open(LOG_FILE, 'w', encoding='utf-8') as f:
        json.dump(log, f, indent=2, ensure_ascii=False)

    print(f"\n{'─'*50}")
    print(f"Done. Updated: {updated}  |  Skipped: {skipped}")

if __name__ == '__main__':
    main()
