import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: './.env' });

const News = mongoose.model('News', new mongoose.Schema({ category: String, type: String }));

async function run() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('--- News Data Stats ---');
        const stats = await News.aggregate([
            { $group: { _id: { cat: '$category', type: '$type' }, count: { $sum: 1 } } }
        ]);
        console.table(stats.map(s => ({ Category: s._id.cat, Type: s._id.type, Count: s.count })));

        const generalNews = await News.find({ category: 'General' }).limit(10);
        console.log('\n--- Sample General News Titles ---');
        generalNews.forEach(n => console.log(`- ${n.title}`));

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

run();
