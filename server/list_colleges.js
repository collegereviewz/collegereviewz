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

    const colleges = await College.find().limit(10).select('name district state');
    console.log(JSON.stringify(colleges, null, 2));

    process.exit(0);
}

check();
