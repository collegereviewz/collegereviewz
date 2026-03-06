import mongoose from 'mongoose';
import College from '../src/models/College.model.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const COLLEGES_DATA = {
    'IIT-Delhi': {
        name: 'IIT Delhi - Indian Institute of Technology [IITD]',
        stats: {
            external: { google: { rating: 4.6, count: 11000 }, shiksha: { rating: 4.5, count: 920 }, collegedunia: { rating: 4.4, count: 380 } },
            pros: ["Prime location in South Delhi", "Outstanding research facilities", "Top-tier student startups", "Vibrant campus culture", "Rich alumni network"],
            cons: ["Highly competitive environment", "Hectic academic schedule", "Limited parking", "Pressure of placements", "Strict attendance rules"],
            topReviews: [
                { author: "Rahul", content: "The startup culture here is amazing. Life at IITD is beyond books.", rating: 5, source: "Shiksha", date: "Jan 2026" },
                { author: "Megha", content: "Academic pressure is real, but the rewards are worth it.", rating: 4.5, source: "Collegedunia", date: "Feb 2026" }
            ]
        }
    },
    'IIT-Madras': {
        name: 'IIT Madras - Indian Institute of Technology [IITM]',
        stats: {
            external: { google: { rating: 4.7, count: 9500 }, shiksha: { rating: 4.6, count: 750 }, collegedunia: { rating: 4.5, count: 310 } },
            pros: ["Beautiful forested campus", "Strong focus on research", "Excellent coding culture", "Decades of academic excellence", "Top-class sports facilities"],
            cons: ["Language barrier for some", "Challenging core subjects", "Humidity in Chennai", "Strict academic norms", "Competitive peer group"],
            topReviews: [
                { author: "Karthik", content: "Research opportunities are world-class. Coding culture is the best.", rating: 5, source: "Collegedunia", date: "Jan 2026" },
                { author: "Sowmya", content: "Campus is like a forest. Peaceful but academics are intense.", rating: 4.5, source: "Shiksha", date: "Feb 2026" }
            ]
        }
    },
    'IIT-Kanpur': {
        name: 'IIT Kanpur - Indian Institute of Technology [IITK]',
        stats: {
            external: { google: { rating: 4.7, count: 8200 }, shiksha: { rating: 4.6, count: 680 }, collegedunia: { rating: 4.5, count: 290 } },
            pros: ["Vast 1000+ acre campus", "Top-notch computer science labs", "Academic freedom", "Rich sports culture", "Strong emphasis on basic sciences"],
            cons: ["Remote location from city", "Extreme weather conditions", "Heavy workload", "Tough grading system", "Limited entertainment nearby"],
            topReviews: [
                { author: "Vivek", content: "The CS department is simply the best. Huge campus life.", rating: 5, source: "Shiksha", date: "Jan 2026" },
                { author: "Aditi", content: "Great freedom for students, but weather can be harsh.", rating: 4.5, source: "Collegedunia", date: "Feb 2026" }
            ]
        }
    },
    'IIT-Kharagpur': {
        name: 'IIT Kharagpur - Indian Institute of Technology [IITKGP]',
        stats: {
            external: { google: { rating: 4.5, count: 15000 }, shiksha: { rating: 4.4, count: 1200 }, collegedunia: { rating: 4.3, count: 550 } },
            pros: ["Largest campus in India", "Oldest and most diverse IIT", "Excellent interdisciplinary culture", "Strong placement record", "Illumination & Rangoli festivals"],
            cons: ["Older infrastructure in some areas", "Hectic traveling across campus", "Far from Kolkata", "Highly competitive", "Strict departmental rules"],
            topReviews: [
                { author: "Deepak", content: "KGP is an emotion. The heritage of this place is unique.", rating: 5, source: "Collegedunia", date: "Jan 2026" },
                { author: "Shreya", content: "Massive campus, diverse people, and intense studies.", rating: 4.5, source: "Shiksha", date: "Feb 2026" }
            ]
        }
    },
    'VIT-Vellore': {
        name: 'Vellore Institute of Technology - [VIT], Vellore',
        stats: {
            external: { google: { rating: 4.4, count: 18000 }, shiksha: { rating: 4.2, count: 2100 }, collegedunia: { rating: 4.1, count: 850 } },
            pros: ["Massive and well-maintained campus", "Excellent placements for CS/IT students", "Diverse student population from across India", "Technologically advanced infrastructure", "Strong focus on international collaborations"],
            cons: ["Very large student intake leading to crowds", "Strict campus rules and timings", "Competitive environment for internships", "Multiple campuses with varying quality", "Mess food can be repetitive"],
            topReviews: [
                { author: "Kiran", content: "The exposure here is great. Placements are solid if you are in the top 10%.", rating: 4, source: "Shiksha", date: "Jan 2026" },
                { author: "Rahul", content: "Infrastructure is world-class, but the campus can feel too crowded sometimes.", rating: 4, source: "Collegedunia", date: "Feb 2026" }
            ]
        }
    },
    'BITS-Pilani': {
        name: 'Birla Institute of Technology and Science - [BITS], Pilani',
        stats: {
            external: { google: { rating: 4.6, count: 5500 }, shiksha: { rating: 4.5, count: 480 }, collegedunia: { rating: 4.5, count: 210 } },
            pros: ["Zero reservation policy (pure merit)", "No attendance requirement (freedom)", "Strong alumni network in tech/startups", "Flexible course structure", "Excellent campus life and clubs"],
            cons: ["High tuition fees compared to other institutes", "Located in a small town (remote)", "Harsh desert weather in Pilani", "No reservation leads to extremely high competition", "Frequent lab evaluations and quizzes"],
            topReviews: [
                { author: "Amit", content: "The freedom you get here is unmatched. It truly prepares you for the real world.", rating: 5, source: "Collegedunia", date: "Jan 2026" },
                { author: "Sneha", content: "Great network and peers. Best culture with zero reservation.", rating: 5, source: "Shiksha", date: "Feb 2026" }
            ]
        }
    }
};

async function syncAllIITs() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL);
        console.log("Connected to MongoDB");

        for (const [key, data] of Object.entries(COLLEGES_DATA)) {
            // Find or create
            let college = await College.findOne({
                $or: [
                    { name: data.name },
                    { name: { $regex: new RegExp(key.replace('-', ' '), 'i') } }
                ]
            });

            if (!college) {
                college = new College({ name: data.name, state: 'N/A' });
            }

            college.reviewStats = data.stats;
            await college.save();
            console.log(`Updated ${data.name}`);
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error("Sync Error:", err);
    }
}

syncAllIITs();
