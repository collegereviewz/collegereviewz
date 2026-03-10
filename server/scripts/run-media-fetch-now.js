import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import College from '../src/models/College.model.js';
import { updateCollegeData } from '../src/services/update.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function runImmediateMediaFetch() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to MongoDB.");

        // Find colleges missing videos or photos
        const colleges = await College.find({
            $or: [
                { videos: { $exists: false } },
                { videos: { $size: 0 } },
                { photos: { $exists: false } },
                { photos: { $size: 0 } }
            ]
        });

        console.log(`Found ${colleges.length} colleges needing media updates.`);

        // Limit the first run to a reasonable batch for "right now"
        const batchSize = process.argv[2] ? parseInt(process.argv[2]) : 10;
        const processingBatch = colleges.slice(0, batchSize);

        console.log(`Starting immediate fetch for first ${processingBatch.length} colleges...`);

        for (const college of processingBatch) {
            try {
                console.log(`Processing: ${college.name} (ID: ${college._id})`);
                const result = await updateCollegeData(college._id);
                if (result) {
                    console.log(`✅ Success for ${college.name}`);
                } else {
                    console.log(`⚠️ No update for ${college.name}`);
                }

                // 5s delay to respect Gemini API limits
                await new Promise(resolve => setTimeout(resolve, 5000));
            } catch (err) {
                console.error(`❌ Error for ${college.name}:`, err.message);
            }
        }

        console.log("\nImmediate Media Fetch Completed.");
    } catch (error) {
        console.error("Fatal Error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

runImmediateMediaFetch();
