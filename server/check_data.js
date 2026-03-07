import mongoose from 'mongoose';
import dotenv from 'dotenv';
import College from './src/models/College.model.js';

dotenv.config();

async function check() {
    await mongoose.connect(process.env.DATABASE_URL);
    const count = await College.countDocuments();
    console.log('Total Colleges:', count);

    // Find one with aisheId
    const withAishe = await College.findOne({ aisheId: { $exists: true, $ne: null } }).lean();
    console.log('College with AISHE ID:', JSON.stringify(withAishe, null, 2));

    // Find one with establishedYear
    const withYear = await College.findOne({ establishedYear: { $exists: true, $ne: '' } }).lean();
    console.log('College with Established Year:', JSON.stringify(withYear, null, 2));

    process.exit();
}

check();
