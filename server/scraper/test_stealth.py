import asyncio
import random
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        # Use a real browser-like environment
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            viewport={'width': 1920, 'height': 1080}
        )
        page = await context.new_page()
        
        # Random delay to mimic human behavior
        await asyncio.sleep(random.uniform(2, 5))
        
        url = "https://collegedunia.com/engineering/gujarat-colleges"
        print(f"Navigating to {url}...")
        
        try:
            # Set extra headers
            await page.set_extra_http_headers({
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
                "Referer": "https://www.google.com/"
            })
            
            response = await page.goto(url, wait_until="domcontentloaded", timeout=45000)
            print(f"Status: {response.status}")
            
            if response.status == 200:
                # Wait for college cards to load
                await page.wait_for_selector(".college-card", timeout=15000)
                print("Successfully loaded listing page!")
                
                # Extract college links
                links = await page.query_selector_all("a.college_name")
                print(f"Found {len(links)} college links on page.")
                
                for i, link in enumerate(links[:5]):
                    name = await link.inner_text()
                    href = await link.get_attribute("href")
                    print(f"[{i+1}] {name.strip()}: {href}")
            else:
                print("Blocked or failed to load.")
                
        except Exception as e:
            print("Error:", e)
            # Take a screenshot for debugging if it fails
            await page.screenshot(path="debug_screenshot.png")
            print("Screenshot saved to debug_screenshot.png")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
