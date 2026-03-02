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

const seedColleges = async () => {
    try {
        const uri = process.env.DATABASE_URL;
        if (!uri) {
            throw new Error('DATABASE_URL is not defined in environment variables');
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(uri);
        console.log('MongoDB Connected!');

        const csvFilePath = path.join(__dirname, '../../client/src/pages/ExploreColleges/aicteall.csv');

        if (!fs.existsSync(csvFilePath)) {
            console.error(`CSV file not found at: ${csvFilePath}`);
            process.exit(1);
        }

        console.log('Parsing CSV and preparing data...');
        const colleges = [];
        const seenAicteIds = new Set();

        await new Promise((resolve, reject) => {
            fs.createReadStream(csvFilePath)
                .pipe(csv())
                .on('data', (row) => {
                    // Extract data from the CSV headers. Note: Headers might have spaces or exact casing.
                    // The CSV headers: 
                    // STATE,Aicte ID,Name,Address,District,Institution Type,Programme,University,Level of the course,Course,Course Type,Intake

                    const aicteId = row['Aicte ID'];
                    if (!aicteId || seenAicteIds.has(aicteId)) return; // Skip duplicates or missing IDs

                    seenAicteIds.add(aicteId);

                    colleges.push({
                        state: row['STATE'],
                        aicteId: aicteId,
                        name: row['Name'],
                        address: row['Address'],
                        district: row['District'],
                        institutionType: row['Institution Type'],
                        programme: row['Programme'],
                        university: row['University'],
                        levelOfCourse: row['Level of the course'],
                        course: row['Course'],
                        courseType: row['Course Type'],
                        intake: parseInt(row['Intake']) || 0
                    });
                })
                .on('end', () => {
                    console.log(`Parsed ${colleges.length} unique colleges from CSV.`);
                    resolve();
                })
                .on('error', reject);
        });

        console.log('Deleting existing records to start fresh...');
        await College.deleteMany({});

        console.log('Inserting new records into the database...');
        await College.insertMany(colleges);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedColleges();
