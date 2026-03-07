import mongoose from 'mongoose';
import College from '../src/models/College.model.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env' });

const IIT_BOMBAY_DATA = {
    reviewStats: {
        external: {
            google: { rating: 4.6, count: 12500 },
            shiksha: { rating: 4.6, count: 850 },
            collegedunia: { rating: 4.4, count: 404 }
        },
        pros: [
            "World-class placements with top international offers",
            "Lush green 545-acre campus with Wi-Fi and modern labs",
            "Vibrant culture with Mood Indigo and Techfest festivals",
            "Highly qualified PhD faculty and cutting-edge research",
            "Excellent sports infrastructure and swimming pools"
        ],
        cons: [
            "Extremely rigorous and stressful academic workload",
            "Congestion in older hostels (Hostels 2-9)",
            "Strict 80% mandatory attendance policy",
            "Average mess food quality in some hostels",
            "High competition and pressure among top rankers"
        ],
        topReviews: [
            {
                author: "Siddharth",
                content: "Academic growth is unmatched. The exposure you get here is unlike anywhere else in India. Placements are a breeze if you maintain a decent CGPA.",
                rating: 5,
                source: "Collegedunia",
                date: "Jan 2026"
            },
            {
                author: "Ananya",
                content: "Campus life is a dream. Festivals like Mood Indigo make it special. However, the coursework is very hectic and keeping up can be tough.",
                rating: 4.5,
                source: "Shiksha",
                date: "Feb 2026"
            }
        ]
    }
};

async function syncIITBombay() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL);
        console.log("Connected to MongoDB");

        const name = 'IIT Bombay - Indian Institute of Technology - [IITB]';
        const college = await College.findOne({ name });
        if (college) {
            college.reviewStats = IIT_BOMBAY_DATA.reviewStats;
            await college.save();
            console.log("Successfully updated IIT Bombay review data!");
        } else {
            console.error(`IIT Bombay not found in database with name: ${name}`);
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error("Sync Error:", err);
    }
}

syncIITBombay();
