import requests

urls = [
    "https://rcciit.org/images/slider/1.jpg",
    "https://rcciit.org/images/slider/2.jpg",
    "https://rcciit.org/images/slider/3.jpg"
]

for url in urls:
    try:
        res = requests.head(url, timeout=5)
        print(f"{url} -> {res.status_code}")
    except Exception as e:
        print(f"{url} -> Error: {e}")
