import { GoogleGenerativeAI } from '@google/generative-ai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("GEMINI_API_KEY is not defined in the environment variables.");
    process.exit(1);
}

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
    console.error("DATABASE_URL is not defined in the environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Temporary schema definition (or we could import if path is correct, but safer to redefine for standalone script)
const collegeSchema = new mongoose.Schema({
    state: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String },
    district: { type: String },
    institutionType: { type: String },
    university: { type: String },
    officialWebsite: { type: String },
    fees: { type: String },
    establishedYear: { type: String },
    managementType: { type: String },
    courses: [{
        programme: String,
        levelOfCourse: String,
        course: String,
        courseType: String,
        intake: Number,
        fees: String
    }],
    highestPackage: { type: String },
    about: { type: String },
    cutOffs: { type: String },
    admissionProcess: { type: String },
    ranking: { type: String },
    topRecruiters: [{ type: String }],
    resultInfo: { type: String },
    mapLink: { type: String },
    photos: [{ type: String }],
    videos: [{ type: String }],
    scholarships: { type: String },
    faq: [{
        question: String,
        answer: String
    }],
    facilities: [{ type: String }],
    studentLife: { type: String },
    contactDetails: {
        phone: String,
        email: String
    }
}, { timestamps: true });

const College = mongoose.models.College || mongoose.model('College', collegeSchema);

async function fetchRCCData() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB");

        console.log("Initializing Gemini API...");
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            tools: [
                {
                    googleSearch: {}
                }
            ]
        });

        const prompt = `
        You are an elite educational researcher. I need ALL information for "RCC INSTITUTE OF INFORMATION TECHNOLOGY" (RCCIIT), Kolkata, to be updated for the 2024-2025 and 2025-2026 academic sessions. 
        
        CRITICAL: YOU MUST USE GOOGLE SEARCH to verify EVERY data point. The user wants NO BLANK SECTIONS.

        SECTIONS TO FULLY POPULATE:
        1. **College Info**: 4-5 paragraphs about history (estd 1999), vision, and NAAC/NBA status.
        2. **Course & Fees**: 2024-25 fees for all 10 courses specified below.
        3. **Cut Off**: Detailed WBJEE and JEE Main cutoff ranks for 2024 for CSE, IT, ECE, EE.
        4. **Admission**: Detailed procedure for B.Tech (WBJEE/JEE), M.Tech (PGET/GATE), MCA (JECA), and BCA (CET/Merit).
        5. **Ranking and Placement**: NIRF or state rankings, average/highest packages for 2024, and 10+ top recruiters.
        6. **Result**: MAKAUT semester exam system, grading, and typical result timelines.
        7. **Location**: Specific Kolkata address, district, and a working Google Maps link.
        8. **Photo & Video**: 5+ Unsplash URLs (campus/labs) and 2-3 YouTube tour links.
        9. **Scholarship**: SVMCM, Kanyashree, Oasis, and other schemes for WB students.
        10. **Q & A**: 8-10 helpful FAQs about hostel, faculty, and placements.
        11. **Facility**: 10+ facilities (Smart Classrooms, Library, Labs, Cafeteria, etc.)
        12. **Student Life**: Details on Fests (Bihaan, Techtrix), Sports (Invicta), and Student Clubs.
        13. **Contact Details**: Official phone numbers and email.
        14. **Updates**: Provide 3 recent notifications, 3 news items, and 3 events for 2025.

        CRITICAL FORMATTING:
        - Fees: "X.XX Lakhs"
        - Packages: "X.X LPA" or "X.X Lakhs - Y.Y Lakhs"
        
        Respond with raw JSON only matching the schema exactly.

        {
            "name": "RCC INSTITUTE OF INFORMATION TECHNOLOGY",
            "state": "West Bengal",
            "address": "String",
            "district": "Kolkata",
            "institutionType": "Private (Government Sponsored)",
            "university": "Maulana Abul Kalam Azad University of Technology (MAKAUT)",
            "officialWebsite": "https://rcciit.org/",
            "fees": "6.04 Lakhs",
            "establishedYear": "1999",
            "managementType": "Private",
            "avgPackage": "String",
            "highestPackage": "String",
            "about": "String (Detailed overview)",
            "cutOffs": "String (Detailed ranks)",
            "admissionProcess": "String",
            "ranking": "String",
            "topRecruiters": ["String", "..."],
            "resultInfo": "String",
            "mapLink": "String",
            "photos": ["String", "..."],
            "videos": ["String", "..."],
            "scholarships": "String",
            "faq": [{"question": "String", "answer": "String"}],
            "facilities": ["String", "..."],
            "studentLife": "String",
            "contactDetails": {"phone": "String", "email": "String"},
            "courses": [
                {"programme": "B.Tech", "levelOfCourse": "UNDER GRADUATE", "course": "Computer Science & Engineering", "courseType": "FULL TIME", "intake": 210, "fees": "String"},
                {"programme": "B.Tech", "levelOfCourse": "UNDER GRADUATE", "course": "Information Technology", "courseType": "FULL TIME", "intake": 120, "fees": "String"},
                {"programme": "B.Tech", "levelOfCourse": "UNDER GRADUATE", "course": "Electronics & Communication Engineering", "courseType": "FULL TIME", "intake": 120, "fees": "String"},
                {"programme": "B.Tech", "levelOfCourse": "UNDER GRADUATE", "course": "Electrical Engineering", "courseType": "FULL TIME", "intake": 60, "fees": "String"},
                {"programme": "B.Tech", "levelOfCourse": "UNDER GRADUATE", "course": "Computer Science and Engineering (Artificial Intelligence and Machine Learning)", "courseType": "FULL TIME", "intake": 60, "fees": "String"},
                {"programme": "M.Tech", "levelOfCourse": "POST GRADUATE", "course": "Computer Science and Engineering", "courseType": "FULL TIME", "intake": 18, "fees": "String"},
                {"programme": "M.Tech", "levelOfCourse": "POST GRADUATE", "course": "Information Technology", "courseType": "FULL TIME", "intake": 18, "fees": "String"},
                {"programme": "M.Tech", "levelOfCourse": "POST GRADUATE", "course": "Microelectronics and VLSI Design", "courseType": "FULL TIME", "intake": 18, "fees": "String"},
                {"programme": "BCA", "levelOfCourse": "UNDER GRADUATE", "course": "Bachelor of Computer Applications", "courseType": "FULL TIME", "intake": 60, "fees": "String"},
                {"programme": "MCA", "levelOfCourse": "POST GRADUATE", "course": "Master of Computer Applications", "courseType": "FULL TIME", "intake": 60, "fees": "String"}
            ],
            "updates": {
                "notifications": [{"title": "String", "date": "String", "link": "String"}],
                "news": [{"title": "String", "date": "String", "link": "String"}],
                "events": [{"title": "String", "date": "String", "link": "String"}],
                "lastUpdated": "2025-03-06T00:00:00.000Z"
        }
        
        Ensure the response is strictly JSON. Do not include markdown formatting like \`\`\`json or \`\`\`. Just the raw JSON object. NO EXTRA TEXT.
        `;

        console.log("Prompting Gemini AI...");
        const result = await model.generateContent(prompt);
        let text = result.response.text();

        // Clean up markdown in case the model ignored instructions
        if (text.startsWith('```json')) {
            text = text.substring(7, text.length - 3).trim();
        } else if (text.startsWith('```')) {
            text = text.substring(3, text.length - 3).trim();
        }

        console.log("Gemini Response parsing...");
        const collegeData = JSON.parse(text);
        console.log("Data parsed successfully. Name:", collegeData.name);

        console.log("Upserting into MongoDB...");
        // Update or insert
        const updatedDoc = await College.findOneAndUpdate(
            { name: { $regex: new RegExp("^RCC INSTITUTE OF INFORMATION TECHNOLOGY", "i") } }, // find by name
            { $set: collegeData },
            { new: true, upsert: true }
        );

        console.log("Successfully added/updated RCC Institute of Information Technology in the database.");
        console.log("ID:", updatedDoc._id);

    } catch (error) {
        console.error("Error fetching or inserting data:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

fetchRCCData();
