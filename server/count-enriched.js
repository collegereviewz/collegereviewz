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
    const hasEstd = await College.countDocuments({ establishedYear: { $exists: true, $ne: '—' } });
    const hasAishe = await College.countDocuments({ aisheId: { $exists: true } });

    console.log({
        total,
        hasEstd,
        hasAishe
    });

    // Sample one that has Estd
    const sample = await College.findOne({ establishedYear: { $exists: true, $ne: '—' } });
    console.log('Sample enriched college:', sample ? {
        name: sample.name,
        estd: sample.establishedYear
    } : 'NONE');

    process.exit(0);
}

check();
