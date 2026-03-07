"""
Quick DDG debug test
"""
from duckduckgo_search import DDGS; import json, re

ddgs = DDGS()

results = list(ddgs.text('BIRLA VISHVAKARMA MAHAVIDYALAYA established year founded', max_results=5))
print("--- RESULTS ---")
for r in results:
    print(json.dumps(r, indent=2, ensure_ascii=False)[:500])

years = re.findall(r'\b((?:18|19|20)\d{2})\b', ' '.join([r.get('body','') + ' ' + r.get('title','') for r in results]))
print("Years found:", years)
