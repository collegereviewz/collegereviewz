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
const dbUrl = process.env.DATABASE_URL;

if (!apiKey || !dbUrl) {
    console.error("GEMINI_API_KEY or DATABASE_URL not found.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Schema
const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    state: { type: String },
    videos: [{ type: String }],
    updates: { lastUpdated: Date }
});

const College = mongoose.models.College || mongoose.model('College', collegeSchema);

async function scrapeVideosForCollege(college, retryCount = 0) {
    console.log(`Scraping videos for: ${college.name} (${college.state})`);

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash", // Using flash for speed/cost
        tools: [{ googleSearch: {} }]
    });

    const prompt = `Find 3-5 high-quality YouTube video URLs (tours, reviews, or official videos) for "${college.name}, ${college.state}".
    Return ONLY a JSON array of YouTube URLs. Example: ["https://www.youtube.com/watch?v=...", ...]
    If no videos found, return [].`;

    try {
        const result = await model.generateContent(prompt);
        let text = result.response.text();

        // Basic cleanup
        if (text.includes('```')) {
            text = text.replace(/```json|```/g, '').trim();
        }

        const videos = JSON.parse(text);
        if (Array.isArray(videos)) {
            console.log(`Found ${videos.length} videos for ${college.name}`);
            await College.findByIdAndUpdate(college._id, {
                $set: {
                    videos: videos,
                    'updates.lastUpdated': new Date()
                }
            });
            return true;
        }
    } catch (error) {
        if (error.message.includes('429') && retryCount < 3) {
            const waitTime = Math.pow(2, retryCount) * 10000; // Exponential backoff starts at 10s
            console.log(`Rate limited for ${college.name}. Waiting ${waitTime / 1000}s and retrying...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            return scrapeVideosForCollege(college, retryCount + 1);
        }
        console.error(`Error for ${college.name}:`, error.message);
    }
    return false;
}

async function startScraping(batchSize = 5) {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to DB");

        // Find colleges missing videos
        const colleges = await College.find({
            $or: [
                { videos: { $exists: false } },
                { videos: { $size: 0 } }
            ]
        }).limit(batchSize);

        console.log(`Starting scraping for ${colleges.length} colleges...`);

        for (const college of colleges) {
            const success = await scrapeVideosForCollege(college);
            if (success) {
                // Larger delay between successful calls to stay under quota
                await new Promise(resolve => setTimeout(resolve, 5000));
            } else {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        console.log("Batch completed.");
    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

// You can pass the limit as an argument
const limit = process.argv[2] ? parseInt(process.argv[2]) : 5;
startScraping(limit);
