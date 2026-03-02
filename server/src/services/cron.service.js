import cron from 'node-cron';
import College from '../models/College.model.js';
import { updateCollegeData } from './update.service.js';

/**
 * Background task to update college data every 10 minutes
 */
export const initCronJobs = () => {
    console.log('Initializing Cron Jobs...');

    // Run every 10 minutes
    cron.schedule('*/10 * * * *', async () => {
        console.log('Running 10-minute College Update Cron:', new Date().toLocaleString());

        try {
            // Find all colleges that have an official website
            // (or we can iterate all and let the service guess)
            const colleges = await College.find({});

            console.log(`Processing updates for ${colleges.length} colleges...`);

            // Use for...of to avoid hitting rate limits too fast (sequential execution)
            for (const college of colleges) {
                try {
                    await updateCollegeData(college._id);
                    // Add a small delay between colleges to be gentle on target websites
                    await new Promise(resolve => setTimeout(resolve, 2000));
                } catch (err) {
                    console.error(`Cron error for ${college.name}:`, err.message);
                }
            }

            console.log('Cron Job Completed:', new Date().toLocaleString());
        } catch (error) {
            console.error('Master Cron Error:', error.message);
        }
    });

    console.log('Cron Job Scheduled: every 10 minutes');
};
