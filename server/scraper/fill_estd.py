"""
fill_estd.py  –  fill missing establishedYear for all colleges
Uses DuckDuckGo text search + regex extraction.
Run:  python fill_estd.py
"""
import os, time, re, json
from collections import Counter
from pymongo import MongoClient
from dotenv import load_dotenv
from duckduckgo_search import DDGS

# ─── config ───────────────────────────────────────────────────
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
DATABASE_URL = os.getenv('DATABASE_URL')

BATCH_LIMIT    = 100         # how many colleges to process per run
SLEEP_BETWEEN  = 2           # seconds between searches
MIN_CONFIDENCE = 2           # need at least this many mentions of the same year
LOG_FILE       = "fill_estd_log.json"
# ──────────────────────────────────────────────────────────────

def extract_years(text):
    return re.findall(r'\b((?:18|19|20)\d{2})\b', text or '')

def best_year(snippets):
    """Pick the most frequently mentioned valid year across all snippets."""
    years = []
    for s in snippets:
        years += extract_years(s.get('body', ''))
        years += extract_years(s.get('title', ''))
    valid = [y for y in years if 1800 <= int(y) <= 2026]
    if not valid:
        return None, 0
    counts = Counter(valid)
    top = counts.most_common(1)[0]
    return top[0], top[1]   # year, frequency

def main():
    print("Connecting to MongoDB …")
    client = MongoClient(DATABASE_URL)
    db     = client.get_default_database()
    col    = db['colleges']

    # colleges with no established year
    missing = list(col.find({
        "$or": [
            {"establishedYear": {"$exists": False}},
            {"establishedYear": {"$in": ["—", "", "-", "undefined", None]}}
        ]
    }, {"_id": 1, "name": 1, "state": 1}).limit(BATCH_LIMIT))

    print(f"Processing {len(missing)} colleges …\n")

    ddgs     = DDGS()
    updated  = 0
    skipped  = 0
    log      = []

    for college in missing:
        name  = college.get('name', '')
        state = (college.get('state', '') or '').split('(')[0].strip()
        
        # Use first 5 words only to avoid "no results" with very long names
        short_name = ' '.join(name.split()[:5])
        query = f'{short_name} {state} established year founded'

        try:
            results = list(ddgs.text(query, max_results=6))
            year, freq = best_year(results)

            entry = {"name": name, "state": state, "found": year, "freq": freq}
            log.append(entry)

            if year and freq >= MIN_CONFIDENCE:
                col.update_one({"_id": college["_id"]},
                               {"$set": {"establishedYear": year}})
                updated += 1
                print(f"  ✓  {name[:55]:55s} → {year}  (mentions: {freq})")
            else:
                skipped += 1
                reason = "no match" if not year else f"low confidence ({freq})"
                print(f"  ✗  {name[:55]:55s} ← {reason}")

            time.sleep(SLEEP_BETWEEN)

        except Exception as e:
            print(f"  !  Error for '{name}': {e}")
            skipped += 1
            time.sleep(5)

    # save log
    with open(LOG_FILE, 'w', encoding='utf-8') as f:
        json.dump(log, f, indent=2, ensure_ascii=False)

    print(f"\n──────────────────────────────────")
    print(f"Done.  Updated: {updated}  |  Skipped: {skipped}")
    print(f"Log saved to {LOG_FILE}")

if __name__ == '__main__':
    main()
