import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../server/.env') });

// Import Model
import College from '../server/src/models/College.model.js';

const INFO_PATH = path.join(__dirname, 'college_info.json');

const syncData = async () => {
    try {
        const uri = process.env.DATABASE_URL;
        if (!uri) throw new Error('DATABASE_URL not defined');

        await mongoose.connect(uri);
        console.log('MongoDB Connected');

        if (!fs.existsSync(INFO_PATH)) {
            console.error('college_info.json not found');
            process.exit(1);
        }

        const collegeInfo = JSON.parse(fs.readFileSync(INFO_PATH, 'utf-8'));
        console.log(`Loaded info for ${Object.keys(collegeInfo).length} colleges`);

        let updatedCount = 0;
        for (const [name, info] of Object.entries(collegeInfo)) {
            const update = {};
            if (info.fees) update.fees = info.fees;
            if (info.avgPackage) update.avgPackage = info.avgPackage;
            if (info.highestPackage) update.highestPackage = info.highestPackage;
            if (info.website) update.officialWebsite = info.website;

            if (Object.keys(update).length > 0) {
                const res = await College.updateMany(
                    { name: { $regex: new RegExp(`^${name}$`, 'i') } },
                    { $set: update }
                );
                if (res.modifiedCount > 0) updatedCount += res.modifiedCount;
            }
        }

        console.log(`Sync complete. Updated ${updatedCount} records.`);
        process.exit(0);
    } catch (error) {
        console.error('Sync error:', error);
        process.exit(1);
    }
};

syncData();
