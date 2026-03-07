import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

model = genai.GenerativeModel("gemini-2.0-flash")
print("[+] Querying...")
try:
    response = model.generate_content("What is RCC Institute of Information Technology?")
    print(f"Response text begins with: {response.text[:200]}")
except Exception as e:
    print(f"Error: {e}")
