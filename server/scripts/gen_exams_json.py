import csv
import os
import json

exams_dir = r"f:\collegereviewz\client\src\pages\ExploreColleges\Exams"
output_file = r"f:\collegereviewz\client\src\pages\ExploreColleges\Exams\exams_data.json"

exams = []
id_counter = 1

file_mapping = {
    'MBBS': ['Medical & Allied.csv', 'STEM & Medical Sciences.csv'],
    'BE/B.Tech': ['Engineering Architecture.csv', 'UG Entrance.csv'],
    'BBA': ['Arts, Commerce, Law, Design & Management.csv', 'MBA, Law, Arts & Design.csv'],
    'BCA': ['STEM & Medical Sciences.csv'],
    'B.Sc (Nursing)': ['Medical & Allied.csv'],
    'Arts': ['Arts, Commerce, Law, Design & Management.csv', 'MBA, Law, Arts & Design.csv'],
    'Law': ['Arts, Commerce, Law, Design & Management.csv', 'MBA, Law, Arts & Design.csv'],
    'Science': ['STEM & Medical Sciences.csv', 'School Academics.csv'],
    'Commerce': ['Arts, Commerce, Law, Design & Management.csv', 'Professional Licenses.csv'],
    'Pharmacy': ['Medical & Allied.csv'],
    'ME/M.Tech': ['Engineering Architecture.csv', 'Teaching & Research Eligibility.csv']
}

# Reverse mapping for easier lookup
rev_mapping = {}
for stream, files in file_mapping.items():
    for f in files:
        if f not in rev_mapping:
            rev_mapping[f] = []
        rev_mapping[f].append(stream)

csv_files = [f for f in os.listdir(exams_dir) if f.endswith('.csv')]

seen_exams = set()

for csv_file in csv_files:
    streams = rev_mapping.get(csv_file, ['All'])
    file_path = os.path.join(exams_dir, csv_file)
    try:
        with open(file_path, mode='r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            for row in reader:
                exam_name = row.get('Exam Name', '').strip()
                if not exam_name or exam_name in seen_exams: continue
                
                seen_exams.add(exam_name)
                
                # Basic cleaning for display name
                exam_short = exam_name.split('(')[0].strip()
                
                exams.append({
                    "id": id_counter,
                    "name": exam_short if len(exam_short) < 30 else exam_short[:27] + "...",
                    "fullName": exam_name,
                    "category": streams[0], # Just pick the first mapping for now
                    "examDate": "TBA 2026",
                    "appDate": "TBA 2026",
                    "resultDate": "TBA 2026",
                    "logo": "",
                    "color": "#3b82f6"
                })
                id_counter += 1
    except Exception as e:
        print(f"Error reading {csv_file}: {e}")

# Limit to top 100 for performance if needed, but let's try 50 first if it's too many
# Actually the user said "all", so I'll output all to the JSON but maybe the component should load it?
# For now, I'll just write the full JSON.

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(exams, f, indent=2)

print(f"Generated {len(exams)} exams.")
