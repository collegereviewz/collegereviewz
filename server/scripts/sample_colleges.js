import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function getSamples() {
    await mongoose.connect(process.env.DATABASE_URL);
    const College = mongoose.models.College || mongoose.model('College', new mongoose.Schema({ name: String, state: String }));
    const samples = await College.find({ name: { $not: /RCC/i } }).limit(5);
    console.log(JSON.stringify(samples, null, 2));
    await mongoose.disconnect();
}

getSamples();
