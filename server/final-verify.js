import mongoose from 'mongoose';
import dotenv from 'dotenv';
import News from './src/models/News.model.js';

dotenv.config({ path: './.env' });

async function run() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        const cats = ['MBBS', 'BE/B.Tech', 'Law', 'Science', 'Commerce', 'Pharmacy', 'ME/M.Tech', 'B.Sc Nursing', 'General'];

        console.log('--- Current Data Coverage ---');
        for (const cat of cats) {
            const count = await News.countDocuments({ category: cat });
            console.log(`${cat.padEnd(15)}: ${count} items`);
            if (count > 0) {
                const sample = await News.findOne({ category: cat });
                console.log(`  > Sample: ${sample.title}`);
            }
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
run();
