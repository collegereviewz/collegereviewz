import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import College from './src/models/College.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

async function check() {
    await mongoose.connect(process.env.DATABASE_URL);

    const total = await College.countDocuments();
    const hasCommute = await College.countDocuments({
        commuteIntelligence: { $exists: true, $not: { $size: 0 } }
    });
    const missingCommute = total - hasCommute;

    console.log({
        total,
        hasCommute,
        missingCommute
    });

    process.exit(0);
}

check();
