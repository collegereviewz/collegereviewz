from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
DATABASE_URL = os.getenv('DATABASE_URL')

def update_estd():
    client = MongoClient(DATABASE_URL)
    db = client.get_default_database()
    col = db['colleges']
    
    data = [
        ('IIT Gandhinagar', '2008'),
        ('Sardar Vallabhbhai National Institute of Technology', '1961'),
        ('Dhirubhai Ambani Institute of Information and Communication Technology', '2001'),
        ('Indian Institute of Information Technology - [IIIT], Surat', '2017'),
        ('IIIT Vadodara', '2013')
    ]
    
    for name, year in data:
        result = col.update_one(
            {'name': {'$regex': f'^{name}', '$options': 'i'}},
            {'$set': {'establishedYear': year}}
        )
        print(f"Updated {name}: {result.modified_count} matches.")
    
    client.close()

if __name__ == "__main__":
    update_estd()
