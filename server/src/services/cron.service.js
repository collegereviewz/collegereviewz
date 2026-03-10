import cron from 'node-cron';
import College from '../models/College.model.js';
import { updateCollegeData } from './update.service.js';
import { scrapeLatestNews } from './newsScraper.service.js';

/**
 * Background task to update college data
 */
export const initCronJobs = () => {
    console.log('Initializing Cron Jobs...');

    // 1. Live Updates Cron (Every 10 minutes)
    // Focused on a small batch of "hot" or recently updated colleges to get latest news
    cron.schedule('*/10 * * * *', async () => {
        console.log('Running 10-minute Quick Update Cron:', new Date().toLocaleString());
        try {
            // Process a batch of 10 colleges every 10 mins (covers ~1440 colleges/day)
            // Sorting by lastUpdated to rotate through them
            const colleges = await College.find({})
                .sort({ 'updates.lastUpdated': 1 })
                .limit(10);

            for (const college of colleges) {
                try {
                    await updateCollegeData(college._id);
                    await new Promise(resolve => setTimeout(resolve, 3000));
                } catch (err) {
                    console.error(`Quick Cron error for ${college.name}:`, err.message);
                }
            }
        } catch (error) {
            console.error('Quick Cron Master Error:', error.message);
        }
    });

    // 2. Daily Master Media Fetch (Every day at midnight)
    // Specifically focused on ensuring every college has Photos & Videos via Gemini AI
    cron.schedule('0 0 * * *', async () => {
        console.log('Running DAILY Master Photo/Video Fetch:', new Date().toLocaleString());
        try {
            // Processing colleges that are missing videos or photos
            const colleges = await College.find({
                $or: [
                    { videos: { $exists: false } },
                    { videos: { $size: 0 } },
                    { photos: { $exists: false } },
                    { photos: { $size: 0 } }
                ]
            });

            console.log(`Daily Photo/Video update needed for ${colleges.length} colleges.`);

            for (const college of colleges) {
                try {
                    // updateCollegeData now includes the AI media check we added
                    console.log(`Daily Fetch: checking media for ${college.name}`);
                    await updateCollegeData(college._id);

                    // Delay to stay within Gemini API rate limits (e.g., 5 seconds between AI calls)
                    await new Promise(resolve => setTimeout(resolve, 5000));
                } catch (err) {
                    console.error(`Daily Cron error for ${college.name}:`, err.message);
                    // If we hit 429 too much, we might want to break, but sequential should be fine
                }
            }
            console.log('Daily Master Fetch Job Completed.');
        } catch (error) {
            console.error('Daily Master Cron Error:', error.message);
        }
    });

    console.log('Cron Jobs Scheduled: 10m Quick Update & Daily Master Media Fetch');
};

