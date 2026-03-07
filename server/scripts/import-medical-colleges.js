import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { parse } from 'csv-parse';
import College from '../src/models/College.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const MEDICAL_CSV_PATH = path.join(__dirname, '../../client/src/pages/ExploreColleges/MBBS/medicalcolleges.csv');

async function importMedicalData() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected.');

        // Load colleges for in-memory matching
        console.log('Fetching colleges for caching...');
        const colleges = await College.find({}, { name: 1, state: 1, courses: 1 }).lean();
        const normalize = (s) => s?.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

        const nameStateMap = new Map();
        colleges.forEach(c => {
            const key = `${normalize(c.name)}|${normalize(c.state)}`;
            nameStateMap.set(key, c._id);
        });
        console.log(`Cached ${colleges.length} colleges.`);

        const parser = fs.createReadStream(MEDICAL_CSV_PATH).pipe(parse({
            columns: true,
            skip_empty_lines: true,
            trim: true
        }));

        let count = 0;
        let matched = 0;
        let inserted = 0;

        for await (const record of parser) {
            const rawName = record['Colleges'];
            const sno = record['CD Rank'];
            if (!rawName || !sno || isNaN(parseInt(sno))) continue;

            count++;
            const state = record['State']?.trim();
            const cleanName = rawName.trim();
            const key = `${normalize(cleanName)}|${normalize(state)}`;

            const intake = parseInt(record['Intake AY 2025-26']) || parseInt(record['Intake AY 2024-25']) || 0;

            const mbbsCourse = {
                programme: 'Medical',
                levelOfCourse: 'UG',
                course: 'MBBS',
                courseType: 'Full-Time',
                intake: intake,
                fees: '—' // To be scraped later
            };

            let collegeId = nameStateMap.get(key);

            if (collegeId) {
                // Update existing: Add MBBS to courses if not present
                await College.updateOne(
                    { _id: collegeId, 'courses.course': { $ne: 'MBBS' } },
                    { $addToSet: { courses: mbbsCourse } }
                );
                matched++;
            } else {
                // Create new medical college
                await College.create({
                    name: cleanName,
                    state: state,
                    aicteId: `MED-${sno}`, // Minimal unique ID
                    institutionType: record['Institution Type']?.trim(),
                    courses: [mbbsCourse]
                });
                inserted++;
            }

            if (count % 100 === 0) console.log(`Processed ${count} medical records...`);
        }

        console.log(`Medical import complete.`);
        console.log(`Total processed: ${count}`);
        console.log(`Matched & Updated: ${matched}`);
        console.log(`New Medical Colleges: ${inserted}`);
        process.exit(0);
    } catch (error) {
        console.error('Medical import error:', error);
        process.exit(1);
    }
}

importMedicalData();
