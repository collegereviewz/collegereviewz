import asyncio
import random
import json
import os
from playwright.async_api import async_playwright

CATEGORIES = [
    "engineering", "management", "medical", "pharmacy", "law", 
    "arts", "science", "commerce", "nursing", "architecture"
]

STATES = [
    "gujarat", "maharashtra", "karnataka", "tamil-nadu", "uttar-pradesh",
    "delhi", "west-bengal", "punjab", "haryana", "rajasthan", "madhya-pradesh"
]

async def scrape_listing(page, category, state):
    url = f"https://collegedunia.com/{category}/{state}-colleges"
    print(f"Scraping {category} in {state}...")
    
    try:
        await page.goto(url, wait_until="domcontentloaded", timeout=45000)
        
        # Wait for either the table or a 404/no-results indicator
        try:
            await page.wait_for_selector("table.listing-table", timeout=10000)
        except:
            print(f"  No listing table found for {url}")
            return []

        # Scroll to load more (some pages are lazy loaded)
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight/2)")
        await asyncio.sleep(2)
        
        results = []
        rows = await page.query_selector_all("table.listing-table tbody tr")
        
        for row in rows:
            try:
                name_el = await row.query_selector("a.college_name")
                if not name_el: continue
                name = (await name_el.inner_text()).strip()
                
                fee_el = await row.query_selector("td:nth-child(3) span:first-child")
                fee = (await fee_el.inner_text()).strip() if fee_el else "—"
                
                avg_el = await row.query_selector("td:nth-child(4) a:first-of-type span")
                avg_pkg = (await avg_el.inner_text()).strip() if avg_el else "—"

                high_el = await row.query_selector("td:nth-child(4) a:nth-of-type(2) span")
                high_pkg = (await high_el.inner_text()).strip() if high_el else "—"

                results.append({
                    "name": name,
                    "fees": fee,
                    "avg_placement": avg_pkg,
                    "highest_placement": high_pkg,
                    "category": category,
                    "state": state
                })
            except Exception:
                continue
        
        print(f"  Extracted {len(results)} colleges.")
        return results
    except Exception as e:
        print(f"  Error scraping {url}: {e}")
        return []

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            viewport={'width': 1920, 'height': 1200}
        )
        page = await context.new_page()
        
        all_results = []
        
        # We'll run a subset for this demonstration, then the user can expand
        # Let's do Engineering and Management for top 3 states
        task_list = []
        for cat in CATEGORIES[:2]: # Engineering, Management
            for state in STATES[:3]: # Gujarat, Maharashtra, Karnataka
                task_list.append((cat, state))
        
        for cat, state in task_list:
            # Human-like pacing
            await asyncio.sleep(random.uniform(5, 10))
            batch = await scrape_listing(page, cat, state)
            all_results.extend(batch)
            
            # Progressive saving
            if all_results:
                with open("universal_results.json", "w", encoding="utf-8") as f:
                    json.dump(all_results, f, indent=2, ensure_ascii=False)

        await browser.close()
        print(f"\nDone! Total colleges extracted: {len(all_results)}")

if __name__ == "__main__":
    asyncio.run(main())
