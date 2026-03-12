import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import StudyAbroad from './models/StudyAbroad.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const check = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  const total = await StudyAbroad.countDocuments();
  const countries = await StudyAbroad.find({}, 'id name').lean();
  console.log(`\n📊 Total countries in DB: ${total}\n`);
  countries.forEach((c, i) => console.log(`  ${i + 1}. ${c.name} (${c.id})`));
  process.exit(0);
};
check().catch(err => { console.error(err.message); process.exit(1); });
