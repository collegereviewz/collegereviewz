import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        print("Navigating to CollegeDunia...")
        try:
            await page.goto("https://collegedunia.com/search?q=Birla+Vishvakarma+Mahavidyalaya", timeout=30000)
            await page.wait_for_selector("a[href*='/colleges/']", timeout=10000)
            print("Page loaded successfully!")
            content = await page.content()
            print("Found links:", len(await page.query_selector_all("a[href*='/colleges/']")))
        except Exception as e:
            print("Error:", e)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
