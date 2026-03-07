from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
DATABASE_URL = os.getenv('DATABASE_URL')

def check_ldce():
    client = MongoClient(DATABASE_URL)
    db = client.get_default_database()
    col = db['colleges']
    
    college = col.find_one({"name": {"$regex": "L.D. College of Engineering", "$options": "i"}})
    if college:
        print(f"Name: {college['name']}")
        print(f"Avg Pkg: {college.get('avgPackage', 'N/A')}")
        print(f"High Pkg: {college.get('highestPackage', 'N/A')}")
        if 'courses' in college and len(college['courses']) > 0:
            print(f"First Course Fee: {college['courses'][0].get('fees', 'N/A')}")
        else:
            print("No courses found.")
    else:
        print("LDCE not found in DB.")
    client.close()

if __name__ == "__main__":
    check_ldce()
