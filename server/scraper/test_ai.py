import sys
try:
    from duckduckgo_search import DDGS
    ddgs = DDGS()
    print("Asking AI...")
    resp = ddgs.chat("What is the fee structure for B.Tech in BIRLA VISHVAKARMA MAHAVIDYALAYA Gujarat? Give just the total fee in INR.", model="gpt-4o-mini")
    print("AI Response:", resp)
except Exception as e:
    print("Error:", e)
