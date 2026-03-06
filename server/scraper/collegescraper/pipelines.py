from itemadapter import ItemAdapter
import pymongo
import os
from dotenv import load_dotenv

load_dotenv()

class MongoPipeline:
    def __init__(self):
        self.mongo_uri = os.getenv("DATABASE_URL")
        # Extract DB name from URI or hardcode if needed
        # Typical URI: mongodb+srv://.../dbname?options
        self.mongo_db = "neetadmissionkolkata01_db_user"

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        aicte_id = adapter.get("aicteId")
        courses_scraped = adapter.get("courses", [])
        
        if not aicte_id or not courses_scraped:
            return item

        # Update each scraped course in the college document
        # We try to match by course name
        for course_data in courses_scraped:
            course_name = course_data.get("course")
            if not course_name:
                continue
                
            self.db["colleges"].update_one(
                {"aicteId": aicte_id, "courses.course": course_name},
                {"$set": {
                    "courses.$.fees": course_data.get("fees"),
                    "courses.$.intake": course_data.get("intake")
                }}
            )
            
        return item
