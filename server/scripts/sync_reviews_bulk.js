
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import College from '../src/models/College.model.js';
import { extractCollegeInfo } from '../src/services/gemini.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function syncReviews() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected.');

        // Find colleges missing review stats or having 0 ratings
        // Prioritize colleges that have higher visibility (e.g. ones with established year or specific types)
        const colleges = await College.find({
            $or: [
                { 'reviewStats.external.google.rating': { $exists: false } },
                { 'reviewStats.external.google.rating': 0 },
                { 'reviewStats.external.google.rating': null }
            ],
            name: { $ne: null }
        }).limit(100);

        console.log(`Found ${colleges.length} colleges needing review updates.`);

        for (let i = 0; i < colleges.length; i++) {
            const college = colleges[i];
            process.stdout.write(`[${i + 1}/${colleges.length}] Fetching for: ${college.name}... `);

            try {
                const aiData = await extractCollegeInfo(college.name);
                if (aiData && aiData.reviewStats) {
                    await College.findByIdAndUpdate(college._id, {
                        $set: {
                            reviewStats: aiData.reviewStats,
                            ...(aiData.fees && !college.fees && { fees: aiData.fees }),
                            ...(aiData.avgPackage && !college.avgPackage && { avgPackage: aiData.avgPackage }),
                            ...(aiData.highestPackage && !college.highestPackage && { highestPackage: aiData.highestPackage })
                        }
                    });
                    process.stdout.write(`✅\n`);
                } else {
                    process.stdout.write(`⚠️ No data\n`);
                }

                // Delay to avoid 429
                await new Promise(r => setTimeout(r, 6000));
            } catch (err) {
                process.stdout.write(`❌ Error: ${err.message.substring(0, 50)}\n`);
                if (err.message.includes('429')) {
                    console.log('Rate limit hit, sleeping for 30s...');
                    await new Promise(r => setTimeout(r, 30000));
                }
            }
        }

        console.log('\nBatch update complete.');
        process.exit(0);
    } catch (error) {
        console.error('Fatal error:', error);
        process.exit(1);
    }
}

syncReviews();
