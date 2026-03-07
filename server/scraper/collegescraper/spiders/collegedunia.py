import scrapy
from scrapy_playwright.page import PageMethod
import pymongo
import os
from dotenv import load_dotenv

load_dotenv()

class CollegeduniaSpider(scrapy.Spider):
    name = "collegedunia"
    allowed_domains = ["collegedunia.com"]

    def __init__(self, *args, **kwargs):
        super(CollegeduniaSpider, self).__init__(*args, **kwargs)
        self.mongo_uri = os.getenv("DATABASE_URL")
        self.mongo_db = "neetadmissionkolkata01_db_user"
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def start_requests(self):
        # Fetch 10 colleges for pilot testing
        colleges = self.db["colleges"].find({"fees": {"$exists": False}}).limit(10)
        
        for college in colleges:
            name = college["name"]
            search_query = f"{name} {college.get('state', '')}"
            search_url = f"https://collegedunia.com/search?q={search_query.replace(' ', '+')}"
            
            yield scrapy.Request(
                search_url,
                meta={
                    "playwright": True,
                    "playwright_page_methods": [
                        PageMethod("wait_for_selector", ".college-info", timeout=10000),
                    ],
                    "college": college
                },
                callback=self.parse_search
            )

    def parse_search(self, response):
        college = response.meta["college"]
        # Improved selector for search results
        # Look for the first college link that contains the college name or is in the main listing
        results = response.css("a[href*='/colleges/']::attr(href)").getall()
        
        target_link = None
        for link in results:
            if not any(x in link for x in ["/search", "/compare", "/reviews"]):
                target_link = link
                break
        
        if target_link:
            if not target_link.startswith("http"):
                target_link = "https://collegedunia.com" + target_link
            
            # Navigate to courses-fees subpage
            fees_url = target_link.rstrip('/') + "/courses-fees"
            yield scrapy.Request(
                fees_url,
                meta={
                    "playwright": True,
                    "playwright_page_methods": [
                        PageMethod("wait_for_selector", "table", timeout=15000),
                    ],
                    "college": college
                },
                callback=self.parse_fees
            )
        else:
            self.logger.info(f"No result found for {college['name']}")

    def parse_fees(self, response):
        college = response.meta["college"]
        courses_data = []
        
        # Select rows from the fee table
        # Common pattern: table rows containing course name and fee
        rows = response.css("table tr")
        for row in rows:
            course_name = row.css("td:nth-child(1) a::text, td:nth-child(1)::text").get()
            fee_text = row.css("td:nth-child(2)::text").get()
            intake_text = row.css("td:nth-child(3)::text").get() # Adjust based on real structure
            
            if course_name and fee_text:
                courses_data.append({
                    "course": course_name.strip(),
                    "fees": fee_text.strip(),
                    "intake": self.parse_number(intake_text)
                })
        
        if courses_data:
            yield {
                "aicteId": college["aicteId"],
                "name": college["name"],
                "courses": courses_data,
                "source": "collegedunia",
                "lastUpdated": scrapy.utils.project.get_project_settings().get("CURRENT_TIME_FALLBACK")
            }

    def parse_number(self, text):
        if not text: return None
        # Extract digits
        nums = "".join(filter(str.isdigit, text))
        return int(nums) if nums else None
