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
    const names = [
        "RCC"
    ];

    for (const name of names) {
        console.log(`\nSearching for: ${name}`);
        const colleges = await College.find({ name: new RegExp(name, 'i') });
        if (colleges.length === 0) console.log('  Not found in DB.');
        colleges.forEach(c => {
            console.log(`  - DB Record:`);
            console.log(`    ID: ${c._id}`);
            console.log(`    Name: ${c.name}`);
            console.log(`    State: ${c.state}`);
            console.log(`    AISHE ID: ${c.aisheId}`);
            console.log(`    Estd: ${c.establishedYear}`);
            console.log(`    Mgmt: ${c.managementType}`);
        });
    }
    process.exit(0);
}

check();
