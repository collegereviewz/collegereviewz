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
        const withVideos = await College.find({
            videos: { $exists: true, $not: { $size: 0 } }
        }).limit(10);
        console.log(`Colleges with videos: ${withVideos.length}`);
        withVideos.forEach(c => console.log(`- ${c.name}: ${c.videos.length} videos`));
    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

checkVideos();
