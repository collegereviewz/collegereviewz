import json
import os

# Data provided by the user for the 10-year review
USER_PROVIDED_TREND = [
    {"year": 2016, "count": 500.0},
    {"year": 2017, "count": 110.0}, 
    {"year": 2018, "count": 130.0},
    {"year": 2019, "count": 150.0}, 
    {"year": 2020, "count": 160.0},
    {"year": 2021, "count": 160.0}, 
    {"year": 2022, "count": 190.0},
    {"year": 2023, "count": 210.0}, 
    {"year": 2024, "count": 230.0},
    {"year": 2025, "count": 250.0}
]

# Professional 2026 Exam Dates Research
EXAM_DATES = {
    "JEE Main": {
        "app": "Session 2: Closed (Mar)",
        "exam": "Apr 2 - Apr 9, 2026",
        "result": "Expected Apr 2026",
        "milestones": [
            {"label": "Session 1 Exam", "date": "Jan 21 - Jan 29, 2026", "status": "Completed"},
            {"label": "Session 2 Exam", "date": "Apr 2 - Apr 9, 2026", "status": "Confirmed"},
            {"label": "Result (Session 2)", "date": "Expected Apr 2026", "status": "Expected"}
        ]
    },
    "NEET": {
        "app": "Feb 8 - Mar 11, 2026",
        "exam": "May 3, 2026",
        "result": "Expected June 2026",
        "milestones": [
            {"label": "Registration", "date": "Completed (Mar 11)", "status": "Completed"},
            {"label": "Admit Card", "date": "Expected Apr 2026", "status": "Expected"},
            {"label": "Entrance Exam", "date": "May 3, 2026", "status": "Confirmed"},
            {"label": "Result Date", "date": "June 2026", "status": "Expected"}
        ]
    },
    "CUET": {
        "app": "Feb 23 - Feb 26, 2026",
        "exam": "May 11 - May 31, 2026",
        "result": "Expected July 2026",
        "milestones": [
            {"label": "Application Window", "date": "Closed (Feb)", "status": "Completed"},
            {"label": "Entrance Exam", "date": "May 11 - May 31, 2026", "status": "Tentative"},
            {"label": "Result Declaration", "date": "July 2026", "status": "Expected"}
        ]
    },
    "GATE": {
        "app": "Closed (Oct 2025)",
        "exam": "Feb 7, 8, 14, 15, 2026",
        "result": "Expected Mar 2026",
        "milestones": [
            {"label": "Exam Dates", "date": "Feb 7, 8, 14, 15, 2026", "status": "Completed"},
            {"label": "Official Results", "date": "Mar 2026", "status": "Expected"}
        ]
    },
    "CAT": {
        "app": "Expected Aug 2026",
        "exam": "Nov 29, 2026",
        "result": "Expected Jan 2027",
        "milestones": [
            {"label": "Official Notification", "date": "July 2026", "status": "Expected"},
            {"label": "Registration Starts", "date": "Aug 2026", "status": "Expected"},
            {"label": "Entrance Exam", "date": "Nov 29, 2026", "status": "Expected"}
        ]
    },
    "CLAT": {
        "app": "Closed (Oct 2025)",
        "exam": "Dec 7, 2025",
        "result": "Declared",
        "milestones": [
            {"label": "CLAT 2026 Exam", "date": "Dec 7, 2025", "status": "Completed"},
            {"label": "CLAT 2027 Registration", "date": "Starts Aug 2026", "status": "Expected"}
        ]
    },
    "UPSC CSE": {
        "app": "Closed (Feb)",
        "exam": "May 24, 2026",
        "result": "Expected June 2026",
        "milestones": [
            {"label": "Preliminary Exam", "date": "May 24, 2026", "status": "Confirmed"},
            {"label": "Main Examination", "date": "Aug 21, 2026", "status": "Confirmed"}
        ]
    },
    "BITSAT": {
        "app": "Ongoing",
        "exam": "Apr 15 - May 26, 2026",
        "result": "Expected June 2026",
        "milestones": [
            {"label": "Session 1 Exam", "date": "Apr 15 - Apr 17, 2026", "status": "Confirmed"},
            {"label": "Session 2 Exam", "date": "May 24 - May 26, 2026", "status": "Confirmed"}
        ]
    },
    "WBJEE": {
        "app": "Mar 10 - Apr 5, 2026",
        "exam": "May 24, 2026",
        "result": "Expected June 2026",
        "milestones": [
            {"label": "Registration", "date": "Ongoing (Till Apr 5)", "status": "Ongoing"},
            {"label": "Examination", "date": "May 24, 2026", "status": "Confirmed"},
            {"label": "Result", "date": "June 2026", "status": "Expected"}
        ]
    }
}

FILE_PATHS = [
    "f:/collegereviewz/client/src/pages/ExploreColleges/Exams/exams_data.json",
    "f:/collegereviewz/client/src/data/exams_list.json"
]

def update_exams_data():
    # Stack/LIFO Logic: Ensure we only process and display the LATEST 10 years
    active_trends = USER_PROVIDED_TREND[-10:]
    
    # Calculate summaries based on the 10-year window
    total_lakhs = sum(x["count"] for x in active_trends)
    if total_lakhs >= 100:
        summary = f"{total_lakhs/100:.1f} Cr"
    else:
        summary = f"{total_lakhs:.1f} Lakh"

    # Latest year summary (Top of the Stack)
    latest_trend = USER_PROVIDED_TREND[-1]
    l_count = latest_trend["count"]
    if l_count >= 100:
        latest_summary = f"{l_count/100:.1f} Cr"
    else:
        latest_summary = f"{l_count:.1f} Lakh"
    latest_year = latest_trend["year"]

    for file_path in FILE_PATHS:
        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            continue

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                exams = json.load(f)

            for exam in exams:
                # 1. Update Participation Trends with the Stacked data
                exam["competitionTrends"] = active_trends
                exam["appeared_summary"] = summary
                exam["latest_appeared_summary"] = latest_summary
                exam["latest_year"] = latest_year

                # 2. Update Important Dates (Fetch and Add)
                exam_name = exam.get("name", "")
                full_name = exam.get("fullName", "")
                
                matched_dates = None
                for key, val in EXAM_DATES.items():
                    if key.lower() in exam_name.lower() or key.lower() in full_name.lower():
                        matched_dates = val
                        break
                
                if matched_dates:
                    exam["appDate"] = matched_dates["app"]
                    exam["examDate"] = matched_dates["exam"]
                    exam["resultDate"] = matched_dates["result"]
                    exam["dates"] = matched_dates["milestones"]
                else:
                    # Generic structure for all other exams
                    exam["appDate"] = exam.get("appDate", "TBA 2026")
                    exam["examDate"] = exam.get("examDate", "TBA 2026")
                    exam["resultDate"] = exam.get("resultDate", "TBA 2026")
                    exam["dates"] = [
                        {"label": "Application", "date": exam.get("appDate", "TBA 2026"), "status": "Expected"},
                        {"label": "Exam Date", "date": exam.get("examDate", "TBA 2026"), "status": "Expected"},
                        {"label": "Result Date", "date": exam.get("resultDate", "TBA 2026"), "status": "Expected"}
                    ]

            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(exams, f, indent=2)

            print(f"Successfully updated {len(exams)} exams in {file_path} with dates and trends.")
        except Exception as e:
            print(f"Error updating {file_path}: {e}")

if __name__ == "__main__":
    update_exams_data()
