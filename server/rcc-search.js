import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import College from './src/models/College.model.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

async function check() {
    await mongoose.connect(process.env.DATABASE_URL);
    const colleges = await College.find({ name: /RCC/i }).lean();
    fs.writeFileSync('rcc_data.json', JSON.stringify(colleges, null, 2));
    console.log(`Found ${colleges.length} colleges. Saved to rcc_data.json`);
    process.exit(0);
}

check();
