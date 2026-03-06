import cron from 'node-cron';
import College from '../models/College.model.js';
import { updateCollegeData } from './update.service.js';
import { scrapeLatestNews } from './newsScraper.service.js';

/**
 * Background task to update college data every 10 minutes
 */
export const initCronJobs = () => {
    console.log('Initializing Cron Jobs...');

    // 1. News Scraper (Runs every 30 minutes)
    cron.schedule('*/30 * * * *', async () => {
        console.log('Running scheduled News Scraper:', new Date().toLocaleString());
        await scrapeLatestNews();
    });

    // 2. College data updates (paused)
    /*
    cron.schedule('10 * * * *', async () => {
        // ...Existing college update logic
    });
    */

    console.log('News Scraper Cron Initialized (30m Interval)');
};
