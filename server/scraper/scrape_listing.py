import asyncio
import random
import json
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            viewport={'width': 1920, 'height': 2000}
        )
        page = await context.new_page()
        
        # Human-like delay
        await asyncio.sleep(random.uniform(4, 7))
        
        url = "https://collegedunia.com/engineering/gujarat-colleges"
        print(f"Navigating to {url}...")
        
        try:
            await page.set_extra_http_headers({
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "Referer": "https://www.google.com/"
            })
            
            await page.goto(url, wait_until="domcontentloaded", timeout=60000)
            
            # Selector from browser subagent
            table_selector = "table.listing-table"
            await page.wait_for_selector(table_selector, timeout=20000)
            print("Listing table discovered!")
            
            # Scroll to load more if needed (optional but good practice)
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight/2)")
            await asyncio.sleep(2)
            
            results = []
            rows = await page.query_selector_all("table.listing-table tbody tr")
            print(f"Found {len(rows)} potential college entries.")
            
            for row in rows:
                try:
                    # Semantic selectors provided by subagent
                    name_el = await row.query_selector("a.college_name")
                    if not name_el: continue
                    name = (await name_el.inner_text()).strip()
                    
                    # Fees: td:nth-child(3) a.pointer span
                    fee_el = await row.query_selector("td:nth-child(3) span:first-child")
                    fee = (await fee_el.inner_text()).strip() if fee_el else "—"
                    
                    # Avg Package: td:nth-child(4) a:first-of-type span
                    avg_el = await row.query_selector("td:nth-child(4) a:first-of-type span")
                    avg_pkg = (await avg_el.inner_text()).strip() if avg_el else "—"

                    # Highest Package: td:nth-child(4) a:nth-of-type(2) span
                    high_el = await row.query_selector("td:nth-child(4) a:nth-of-type(2) span")
                    high_pkg = (await high_el.inner_text()).strip() if high_el else "—"

                    results.append({
                        "name": name,
                        "fees": fee,
                        "avg_placement": avg_pkg,
                        "highest_placement": high_pkg
                    })
                    print(f"Extraction: {name[:40]}... | Fees: {fee} | Avg: {avg_pkg}")
                except Exception as row_err:
                    pass

            if results:
                # Filter out entries where name is empty or too short
                results = [r for r in results if len(r['name']) > 5]
                
                with open("listing_results.json", "w", encoding="utf-8") as f:
                    json.dump(results, f, indent=2, ensure_ascii=False)
                print(f"Successfully saved {len(results)} colleges to listing_results.json")
            else:
                print("Extraction failed. Check selectors again.")
                
        except Exception as e:
            print("Error:", e)
            await page.screenshot(path="listing_extraction_fail.png")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
