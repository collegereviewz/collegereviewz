import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const dbUrl = process.env.DATABASE_URL;

const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    videos: [{ type: String }]
});

const College = mongoose.model('College', collegeSchema);

async function checkVideos() {
    try {
        await mongoose.connect(dbUrl);
        const total = await College.countDocuments({});
        const withoutVideos = await College.countDocuments({
            $or: [
                { videos: { $exists: false } },
                { videos: { $size: 0 } }
            ]
        });
        console.log(`Total colleges: ${total}`);
        console.log(`Colleges without videos: ${withoutVideos}`);
    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

checkVideos();
