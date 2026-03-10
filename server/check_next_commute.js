import mongoose from 'mongoose';
import dotenv from 'dotenv';
import College from './src/models/College.model.js';
dotenv.config();

async function check() {
    await mongoose.connect(process.env.DATABASE_URL);
    const college = await College.findOne({
        $or: [
            { commuteIntelligence: { $exists: false } },
            { commuteIntelligence: { $size: 0 } }
        ]
    });
    console.log("Name:", college.name);
    console.log("Name Length:", college.name.length);
    console.log("Name JSON:", JSON.stringify(college.name));
    process.exit(0);
}

check();
