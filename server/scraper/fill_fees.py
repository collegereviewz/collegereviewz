"""
fill_fees.py  –  find and fill missing fees for college courses
Searches DuckDuckGo for fee data from collegedunia/shiksha aggregators.
Run: python fill_fees.py

Strategy:
- For each college that has courses with no fees, search for fee info
- Look for INR amounts in search results (₹ or Rs patterns)
- Assign fee to ALL courses of the college if a consistent fee is found
- Confidence: needs at least 2 mentions of same fee range
"""
import os, time, re, json
from collections import Counter
from pymongo import MongoClient
from dotenv import load_dotenv
from duckduckgo_search import DDGS

load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
DATABASE_URL = os.getenv('DATABASE_URL')

BATCH_LIMIT  = 50    # colleges per run
SLEEP        = 3      # seconds between searches
LOG_FILE     = "fill_fees_log.json"

# ─── Fee extraction ───────────────────────────────────────────────────────────
# Match things like: ₹8,82,500  /  Rs. 1,20,000  /  INR 50000  /  1,50,000 per year
FEE_PATTERN = re.compile(
    r'(?:₹|rs\.?|inr)\s*([\d,]+(?:\.\d+)?)\s*(?:per\s*(?:year|annum|semester))?',
    re.IGNORECASE
)
# Also plain lakhs notation: 8.5 lakhs / 2 lakh
LAKH_PATTERN = re.compile(
    r'([\d.]+)\s*(?:lakh|lac)',
    re.IGNORECASE
)

def parse_fee(text):
    """Return a list of cleaned fee strings found in text."""
    found = []
    for m in FEE_PATTERN.finditer(text or ''):
        raw = m.group(1).replace(',', '')
        try:
            val = int(float(raw))
            if 1000 <= val <= 50_00_000:   # between ₹1,000 and ₹50L
                found.append(val)
        except ValueError:
            pass
    for m in LAKH_PATTERN.finditer(text or ''):
        try:
            val = int(float(m.group(1)) * 1_00_000)
            if 10_000 <= val <= 50_00_000:
                found.append(val)
        except ValueError:
            pass
    return found

def format_fee(val):
    """Format fee as ₹X,XX,XXX."""
    # Indian number formatting
    s = str(val)
    if len(s) <= 3:
        return f'₹{s}'
    # last 3 then groups of 2
    last3 = s[-3:]
    rest = s[:-3]
    parts = []
    while len(rest) > 2:
        parts.insert(0, rest[-2:])
        rest = rest[:-2]
    if rest:
        parts.insert(0, rest)
    return '₹' + ','.join(parts) + ',' + last3

def best_fee(snippets):
    """Find most common fee value across all snippets."""
    all_vals = []
    for s in snippets:
        all_vals += parse_fee(s.get('body', ''))
        all_vals += parse_fee(s.get('title', ''))
    if not all_vals:
        return None, 0
    counts = Counter(all_vals)
    top = counts.most_common(1)[0]
    return top[0], top[1]

def main():
    print("Connecting to MongoDB …")
    client = MongoClient(DATABASE_URL)
    col = client.get_default_database()['colleges']

    # Find colleges where at least one course has no fees
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
                                {"$eq": ["$$c.fees", ""]},
                                {"$eq": ["$$c.fees", "—"]},
                                {"$eq": ["$$c.fees", "-"]},
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
    print(f"Processing {len(colleges)} colleges with missing fees …\n")

    ddgs = DDGS()
    updated = skipped = 0
    log = []

    for college in colleges:
        name  = college.get('name', '')
        state = (college.get('state', '') or '').split('(')[0].strip()
        short_name = ' '.join(name.split()[:6])

        # Search for fee info from Indian college aggregators
        query = f'{short_name} {state} fees structure total fee per year'
        print(f"\nSearching: {short_name} [{state}]")

        try:
            results = list(ddgs.text(query, max_results=8))
            fee_val, freq = best_fee(results)

            entry = {"name": name, "state": state, "found_fee": fee_val, "freq": freq}
            log.append(entry)

            if fee_val and freq >= 2:
                fee_str = format_fee(fee_val)
                print(f"  ✓  {fee_str}  (mentions: {freq})")

                # Update only courses that don't have fees yet
                col.update_one(
                    {"_id": college["_id"]},
                    {"$set": {
                        "courses.$[elem].fees": fee_str
                    }},
                    array_filters=[{"$or": [
                        {"elem.fees": {"$exists": False}},
                        {"elem.fees": ""},
                        {"elem.fees": "—"},
                        {"elem.fees": "-"},
                    ]}]
                )
                updated += 1
            else:
                reason = "no fee found" if not fee_val else f"low confidence ({freq})"
                print(f"  ✗  {reason}")
                skipped += 1

            time.sleep(SLEEP)

        except Exception as e:
            print(f"  !  Error: {e}")
            skipped += 1
            time.sleep(5)

    with open(LOG_FILE, 'w', encoding='utf-8') as f:
        json.dump(log, f, indent=2, ensure_ascii=False)

    print(f"\n{'─'*45}")
    print(f"Done.  Updated: {updated}  |  Skipped: {skipped}")
    print(f"Log saved to {LOG_FILE}")

if __name__ == '__main__':
    main()
