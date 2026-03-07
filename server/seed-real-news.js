import mongoose from 'mongoose';
import dotenv from 'dotenv';
import News from './src/models/News.model.js';

dotenv.config({ path: './.env' });

const realCurrentEvents = [
    {
        title: "NEET UG 2024: Supreme Court hearing on paper leak allegations",
        link: "https://timesofindia.indiatimes.com/education/neet-ug-2024-sc-hearing-live-updates/articleshow/111051515.cms",
        category: "MBBS",
        type: "Exam Alerts",
        summary: "The Supreme Court continues hearing petitions regarding irregularities in the NEET UG 2024 exam.",
        source: "TOI"
    },
    {
        title: "JoSAA 2024 Round 1 Seat Allotment Result Released - Check Here",
        link: "https://josaa.nic.in/",
        category: "BE/B.Tech",
        type: "Admission Alerts",
        summary: "The Joint Seat Allocation Authority has declared the first round of seat allotments for IITs and NITs.",
        source: "JoSAA Official"
    },
    {
        title: "CLAT 2025 Notification: Application process to start in July",
        link: "https://consortiumofnlus.ac.in/",
        category: "Law",
        type: "Exam Alerts",
        summary: "The Consortium of National Law Universities is expected to release the CLAT 2025 application schedule shortly.",
        source: "Consortium of NLUs"
    },
    {
        title: "GPAT 2024 Result Declared: Direct Link to check scorecard",
        link: "https://natboard.edu.in/",
        category: "Pharmacy",
        type: "Exam Alerts",
        summary: "NBE has released the Graduate Pharmacy Aptitude Test results for the 2024 session.",
        source: "NBE"
    },
    {
        title: "AIIMS B.Sc Nursing 2024 Admit Card Released at aiimsexams.ac.in",
        link: "https://www.aiimsexams.ac.in/",
        category: "B.Sc Nursing",
        type: "Exam Alerts",
        summary: "AIIMS has issued admit cards for the upcoming B.Sc Nursing entrance examination.",
        source: "AIIMS"
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Seeding Real Current News...');
        for (const item of realCurrentEvents) {
            await News.findOneAndUpdate(
                { link: item.link },
                { ...item, updatedAt: new Date() },
                { upsert: true, new: true }
            );
        }
        console.log('Guaranteed news seeded.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
seed();
