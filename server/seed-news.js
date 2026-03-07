import mongoose from 'mongoose';
import dotenv from 'dotenv';
import News from './src/models/News.model.js';

dotenv.config({ path: './.env' });

const seedNews = [
    {
        title: "NEET UG 2026 Registration process started - Check how to apply",
        link: "https://example.com/neet-2026",
        category: "MBBS",
        type: "Admission Alerts",
        summary: "The registration for NEET UG 2026 has officially commenced. Interested candidates can apply on the official NTA website.",
        source: "Manual Seed"
    },
    {
        title: "JEE Main 2026 Session 1 Results Declared - See Top Rankers",
        link: "https://example.com/jee-results",
        category: "BE/B.Tech",
        type: "Exam Alerts",
        summary: "NTA has released the results for JEE Main 2026 Session 1. Check your scores and cut-off lists online.",
        source: "Manual Seed"
    },
    {
        title: "CLAT 2026 Notification Out: New Exam Pattern Explained",
        link: "https://example.com/clat-2026",
        category: "Law",
        type: "Exam Alerts",
        summary: "The Consortium of NLUs has released the notification for CLAT 2026 with significant changes in the marking scheme.",
        source: "Manual Seed"
    },
    {
        title: "Top Science Scholarships for Undergraduate Students in 2026",
        link: "https://example.com/science-scholar",
        category: "Science",
        type: "College Alerts",
        summary: "Discover the most prestigious scholarships available for B.Sc and M.Sc students this academic year.",
        source: "Manual Seed"
    },
    {
        title: "CA Foundation June 2026 Exam Schedule Released by ICAI",
        link: "https://example.com/ca-exams",
        category: "Commerce",
        type: "Exam Alerts",
        summary: "ICAI has announced the dates for the CA Foundation exams scheduled for June 2026.",
        source: "Manual Seed"
    },
    {
        title: "GPAT 2026 Admit Card Download Link Active Now",
        link: "https://example.com/gpat-2026",
        category: "Pharmacy",
        type: "Exam Alerts",
        summary: "Candidates appearing for the Graduate Pharmacy Aptitude Test can now download their admit cards.",
        source: "Manual Seed"
    },
    {
        title: "GATE 2026: Preparation Tips for Mechanical and Civil Engineering",
        link: "https://example.com/gate-tips",
        category: "ME/M.Tech",
        type: "Exam Alerts",
        summary: "Experts share key strategies to crack GATE 2026 for postgraduate engineering admissions.",
        source: "Manual Seed"
    },
    {
        title: "B.Sc Nursing Admission 2026: AIIMS opens Entrance Window",
        link: "https://example.com/nursing-adm",
        category: "B.Sc Nursing",
        type: "Admission Alerts",
        summary: "AIIMS has invited applications for the B.Sc Nursing entrance examination for the 2026 session.",
        source: "Manual Seed"
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to DB for seeding...');

        for (const item of seedNews) {
            await News.findOneAndUpdate(
                { link: item.link },
                item,
                { upsert: true, new: true }
            );
        }

        console.log('Seed Finished. UI should have data now.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
