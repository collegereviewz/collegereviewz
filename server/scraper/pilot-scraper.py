import os
import asyncio
from playwright.async_api import async_playwright
import pymongo
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("DATABASE_URL")
DB_NAME = "neetadmissionkolkata01_db_user"

async def scrape_college(page, college):
    name = college["name"]
    state = college.get("state", "")
    print(f"Scraping: {name} ({state})")

    try:
        # Search on Collegedunia
        search_url = f"https://collegedunia.com/search?q={name.replace(' ', '+')}+{state.replace(' ', '+')}"
        await page.goto(search_url, timeout=30000)
        await page.wait_for_selector(".college-info", timeout=10000)
        
        # Get first result
        first_result_handle = await page.query_selector(".college-info a")
        if not first_result_handle:
            print(f"  No results for {name}")
            return None

        college_url = await first_result_handle.get_attribute("href")
        if not college_url.startswith("http"):
            college_url = "https://collegedunia.com" + college_url
        
        # Go to courses-fees
        fees_url = college_url.rstrip('/') + "/courses-fees"
        await page.goto(fees_url, timeout=30000)
        await page.wait_for_selector(".course-fees", timeout=10000)
        
        fee_element = await page.query_selector(".course-fees")
        if fee_element:
            fee_text = await fee_element.inner_text()
            print(f"  Found fee: {fee_text.strip()}")
            return fee_text.strip()
            
    except Exception as e:
        print(f"  Error scraping {name}: {str(e)}")
    return None

async def main():
    client = pymongo.MongoClient(MONGO_URI)
    db = client[DB_NAME]
    colleges = list(db["colleges"].find({"fees": {"$exists": False}}).limit(5))
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        for college in colleges:
            fee = await scrape_college(page, college)
            if fee:
                db["colleges"].update_one(
                    {"aicteId": college["aicteId"]},
                    {"$set": {"fees": fee, "source": "collegedunia_scraper"}}
                )
        
        await browser.close()
    print("Pilot run completed.")

if __name__ == "__main__":
    asyncio.run(main())
