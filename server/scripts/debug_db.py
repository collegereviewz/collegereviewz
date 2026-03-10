import pymongo
import os
from dotenv import load_dotenv

load_dotenv('../.env')
client = pymongo.MongoClient(os.getenv('DATABASE_URL'))
db = client.get_default_database()

name_regex = 'RCC INSTITUTE OF INFORMATION'
college = db.colleges.find_one({'name': {'$regex': name_regex, '$options': 'i'}})

if college:
    print(f"Name: {college.get('name')}")
    print(f"Established: {college.get('establishedYear', 'N/A')}")
    print(f"About: {college.get('about', 'N/A')[:100]}...")
    print(f"Photos: {len(college.get('photos', []))} images")
    print(f"Address: {college.get('address', 'N/A')}")
    print(f"MapLink: {college.get('mapLink', 'N/A')}")
    print(f"ID: {college.get('_id')}")

else:

    print("College not found in DB")
