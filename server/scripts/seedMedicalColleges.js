import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import Model
import College from '../src/models/College.model.js';

const seedMedicalColleges = async () => {
    try {
        const uri = process.env.DATABASE_URL;
        if (!uri) {
            throw new Error('DATABASE_URL is not defined in environment variables');
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(uri);
        console.log('MongoDB Connected!');

        const csvFilePath = path.join(__dirname, '../../client/src/pages/ExploreColleges/MBBS/medicalcolleges.csv');

        if (!fs.existsSync(csvFilePath)) {
            console.error(`CSV file not found at: ${csvFilePath}`);
            process.exit(1);
        }

        console.log('Parsing medicalcolleges.csv and preparing data...');
        const colleges = [];
        const seenNames = new Set();
        let skippedRows = 0;

        await new Promise((resolve, reject) => {
            fs.createReadStream(csvFilePath)
                .pipe(csv())
                .on('data', (row) => {
                    const name = row['Colleges'];
                    const sno = row['CD Rank'];

                    // The CSV has some header/meta rows (e.g., "SEAT MATRIX...") that lack an S.No or valid name
                    if (!name || !sno || !parseInt(sno)) {
                        skippedRows++;
                        return;
                    }

                    if (seenNames.has(name)) return;
                    seenNames.add(name);

                    colleges.push({
                        state: row['State'],
                        // Synthesize an AICTE ID since Medical colleges use NMC not AICTE
                        aicteId: `MED-${sno}-${Date.now()}`,
                        name: name,
                        address: '—', // Address not in CSV
                        district: '—',
                        institutionType: row['Institution Type'],
                        programme: 'MBBS',
                        university: '—',
                        levelOfCourse: 'UG',
                        course: 'MBBS',
                        courseType: 'Full-Time',
                        intake: parseInt(row['Intake AY 2025-26']) || parseInt(row['Intake AY 2024-25']) || 0
                    });
                })
                .on('end', () => {
                    console.log(`Parsed ${colleges.length} unique medical colleges from CSV. Skipped ${skippedRows} meta/invalid rows.`);
                    resolve();
                })
                .on('error', reject);
        });

        console.log('NOTE: We are NOT deleting existing engineering colleges. Appending medical data...');

        // Before inserting, clean any older MBBS seed attempts to prevent duplicates when running this multiple times
        await College.deleteMany({ programme: 'MBBS' });

        console.log(`Inserting ${colleges.length} medical records into the database...`);
        await College.insertMany(colleges);

        console.log('Medical Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedMedicalColleges();
