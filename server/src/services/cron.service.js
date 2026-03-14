import cron from 'node-cron';
import { scrapeLatestNews } from './newsScraper.service.js';

/**
 * Background tasks initialization
 */
export const initCronJobs = () => {
    console.log('Initializing Cron Jobs...');

    // 1. News Scraper Cron (Every 1 hour)
    // Keeps the "Real-time Education Pulse" on the home page updated.
    cron.schedule('0 * * * *', async () => {
        console.log('Running 1-hour News Scraper Cron:', new Date().toLocaleString());
        try {
            await scrapeLatestNews();
        } catch (error) {
            console.error('News Scraper Cron Error:', error.message);
        }
    });

    // College data crons were removed as per user request to stop error logs and reduce load.
    // Data is now being manually injected into the database.

    console.log('Cron Jobs Scheduled: 1h News Scraper');
    
    // Proactively run news scraper on startup to ensure home page has fresh content
    scrapeLatestNews();
};
