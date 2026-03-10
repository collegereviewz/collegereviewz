import { GoogleGenerativeAI } from '@google/generative-ai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) { console.error("GEMINI_API_KEY is not defined."); process.exit(1); }

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) { console.error("DATABASE_URL is not defined."); process.exit(1); }

const genAI = new GoogleGenerativeAI(apiKey);

// Schema mirrors College.model.js
const collegeSchema = new mongoose.Schema({
    state: String, name: String, address: String, district: String,
    institutionType: String, university: String, officialWebsite: String,
    fees: String, establishedYear: String, managementType: String,
    courses: [{ programme: String, levelOfCourse: String, course: String, courseType: String, intake: Number, fees: String }],
    avgPackage: String, highestPackage: String, about: String,
    cutOffs: String, admissionProcess: String, ranking: String,
    topRecruiters: [String], resultInfo: String, mapLink: String,
    photos: [String], videos: [String], scholarships: String,
    faq: [{ question: String, answer: String }], facilities: [String],
    studentLife: String, contactDetails: { phone: String, email: String },
    updates: { lastUpdated: Date }
}, { timestamps: true });

const College = mongoose.models.College || mongoose.model('College', collegeSchema);

// Progress tracking
const PROGRESS_FILE = path.resolve(__dirname, '../sync_progress.json');

function loadProgress() {
    if (fs.existsSync(PROGRESS_FILE)) {
        return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    }
    return { successCount: 0, failCount: 0, failedColleges: [] };
}

function saveProgress(progress) {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

function extractJSON(text) {
    // Try simple clean first
    let cleaned = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
    try {
        return JSON.parse(cleaned);
    } catch (e) {
        // Fall back to regex extraction of the first {...} block
        const match = cleaned.match(/\{[\s\S]*\}/);
        if (match) {
            return JSON.parse(match[0]);
        }
        throw new Error('No valid JSON object found in response');
    }
}

async function syncCollegeWithRetry(college, model, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const result = await model.generateContent(
                `You are an elite educational researcher with access to Google Search. Research "${college.name}", located in ${college.district ? college.district + ', ' : ''}${college.state}, India. Find ALL information accurate as of March 2026.\n    \n    YOU MUST USE GOOGLE SEARCH to verify every data point for the 2024-2025 and 2025-2026 sessions. Do not guess.\n    \n    Populate these 15 sections completely (no blanks):\n    1. Full About: 3-4 paragraphs - history, vision, accreditation (NAAC/NBA/NIRF).\n    2. All Courses & Fees: Every UG/PG program offered with 2025-26 fees.\n    3. Cut Off: 2024/2025 entrance exam ranks (JEE/State CET/NEET etc).\n    4. Admission Process: Step-by-step for each program level.\n    5. Ranking & Placement: Rankings, avg/highest packages, 10+ top recruiters.\n    6. Result System: Exam pattern, university, grading, result timelines.\n    7. Location: Complete address and working Google Maps URL.\n    8. Photos & Videos: 5+ campus image URLs and 2 YouTube tour links.\n    9. Scholarships: All applicable state and central government schemes.\n    10. Q&A: 8-10 realistic FAQs about the college.\n    11. Facilities: 12+ facilities on campus.\n    12. Student Life: Major fests, sports, and active student clubs.\n    13. Contact: Official phone and email.\n    \n    FORMATTING RULES (MANDATORY):\n    - Fees: "X.XX Lakhs" (per year)\n    - Packages: "X.X LPA" or range "X.X Lakhs - Y.Y Lakhs"\n    \n    Respond with ONLY valid raw JSON object (no markdown, no code fences, no extra text outside the JSON):\n    {"address":"","district":"","institutionType":"","university":"","officialWebsite":"","fees":"","establishedYear":"","managementType":"","avgPackage":"","highestPackage":"","about":"","cutOffs":"","admissionProcess":"","ranking":"","topRecruiters":[],"resultInfo":"","mapLink":"","photos":[],"videos":[],"scholarships":"","faq":[{"question":"","answer":""}],"facilities":[],"studentLife":"","contactDetails":{"phone":"","email":""},"courses":[{"programme":"","levelOfCourse":"","course":"","courseType":"","intake":0,"fees":""}]}`
            );
            const text = result.response.text();
            const collegeData = extractJSON(text);
            collegeData.updates = { lastUpdated: new Date('2026-03-06T00:00:00.000Z') };
            await College.findByIdAndUpdate(college._id, { $set: collegeData }, { new: true });
            console.log(`✅ Updated: ${college.name}`);
            return true;
        } catch (error) {
            const isRateLimited = error.message?.includes('429');
            const waitMs = attempt === 1 ? 15000 : attempt === 2 ? 30000 : 60000;
            if (attempt < retries) {
                console.warn(`⚠️  Attempt ${attempt} failed for ${college.name}. ${isRateLimited ? 'Rate limited' : 'Error'}. Retrying in ${waitMs / 1000}s...`);
                await new Promise(r => setTimeout(r, waitMs));
            } else {
                console.error(`❌ All ${retries} attempts failed for: ${college.name} - ${error.message?.substring(0, 120)}`);
                return false;
            }
        }
    }
    return false;
}

async function syncCollege(college, model) {
    console.log(`\n--- Syncing: ${college.name} (${college.state}) ---`);
    return syncCollegeWithRetry(college, model);
}


async function bulkSync() {
    const BATCH_SIZE = parseInt(process.argv[2]) || 20;  // Pass batch size as CLI arg, default 20
    const DELAY_MS = 10000; // 10 second delay between requests to avoid rate limits

    try {
        await mongoose.connect(dbUrl);
        console.log(`✅ Connected to MongoDB.`);
        console.log(`🔄 Starting bulk sync for ${BATCH_SIZE} colleges as of March 6, 2026...\n`);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            tools: [{ googleSearch: {} }]
        });

        const progress = loadProgress();

        // Find colleges not yet synced in March 2026
        const cutoffDate = new Date('2026-03-01T00:00:00.000Z');
        const collegesToSync = await College.find({
            $or: [
                { "updates.lastUpdated": { $exists: false } },
                { "updates.lastUpdated": { $lt: cutoffDate } }
            ]
        }).limit(BATCH_SIZE);

        console.log(`📋 Found ${collegesToSync.length} colleges to sync in this batch.`);

        for (let i = 0; i < collegesToSync.length; i++) {
            const col = collegesToSync[i];
            console.log(`\n[${i + 1}/${collegesToSync.length}]`);
            const success = await syncCollege(col, model);

            if (success) {
                progress.successCount++;
            } else {
                progress.failCount++;
                progress.failedColleges.push({ name: col.name, state: col.state });
            }

            saveProgress(progress);

            if (i < collegesToSync.length - 1) {
                console.log(`⏳ Waiting ${DELAY_MS / 1000}s before next request...`);
                await new Promise(r => setTimeout(r, DELAY_MS));
            }
        }

        console.log(`\n✅ Bulk sync session complete!`);
        console.log(`   Succeeded: ${progress.successCount}`);
        console.log(`   Failed: ${progress.failCount}`);
        if (progress.failedColleges.length > 0) {
            console.log(`   Failed Colleges logged to: sync_progress.json`);
        }

    } catch (error) {
        console.error("Bulk sync error:", error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

bulkSync();
