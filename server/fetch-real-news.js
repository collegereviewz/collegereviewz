import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { scrapeLatestNews } from './src/services/newsScraper.service.js';

dotenv.config({ path: './.env' });

async function run() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('DB Connected. Starting real scrape...');
        await scrapeLatestNews();
        console.log('Real Scrape Finished.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

run();
