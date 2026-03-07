import mongoose from 'mongoose';
import dotenv from 'dotenv';
import News from './src/models/News.model.js';
import { categorizeNews } from './src/services/gemini.service.js';

dotenv.config({ path: './.env' });

async function fix() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to DB. Fetching news to re-categorize...');

        const allNews = await News.find({});
        console.log(`Processing ${allNews.length} items...`);

        // Batch process with Gemini
        const categorized = await categorizeNews(allNews);

        for (let i = 0; i < allNews.length; i++) {
            const original = allNews[i];
            const updated = categorized[i];

            if (updated) {
                await News.findByIdAndUpdate(original._id, {
                    category: updated.category,
                    type: updated.type,
                    summary: updated.summary
                });
            }
        }

        console.log('Re-categorization Finished.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

fix();
