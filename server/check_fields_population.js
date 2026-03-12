
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
    const countEstd = await College.countDocuments({ establishedYear: { $exists: true, $ne: '' } });
    const countWeb = await College.countDocuments({ officialWebsite: { $exists: true, $ne: '' } });

    console.log(`Total Colleges: ${total}`);
    console.log(`With Established Year: ${countEstd}`);
    console.log(`With Official Website: ${countWeb}`);

    process.exit(0);
}

check();
