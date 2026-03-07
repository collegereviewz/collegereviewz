import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import dotenv from 'dotenv';
import College from '../src/models/College.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const CSV_PATH = path.join(__dirname, '../../client/src/pages/ExploreColleges/aicteall.csv');

const importColleges = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to MongoDB.');

        const results = [];
        let count = 0;
        const BATCH_SIZE = 1000;

        console.log(`Reading CSV from: ${CSV_PATH}`);

        const processBatch = async (batch) => {
            const operations = batch.map(data => {
                const {
                    state, aicteId, name, address, district, institutionType, university,
                    ...courseInfo
                } = data;

                return {
                    updateOne: {
                        filter: { aicteId },
                        update: {
                            $set: { state, name, address, district, institutionType, university },
                            $addToSet: { courses: courseInfo }
                        },
                        upsert: true
                    }
                };
            });
            await College.bulkWrite(operations);
        };

        let currentBatch = [];

        fs.createReadStream(CSV_PATH)
            .pipe(csv())
            .on('data', (row) => {
                // Map CSV headers to Model fields
                const collegeData = {
                    state: row['STATE'],
                    aicteId: row['Aicte ID'],
                    name: row['Name'],
                    address: row['Address'],
                    district: row['District'],
                    institutionType: row['Institution Type'],
                    programme: row['Programme'],
                    university: row['University'],
                    levelOfCourse: row['Level of Course'],
                    course: row['Course'],
                    courseType: row['Course Type'],
                    intake: parseInt(row['Intake']) || 0
                };

                if (collegeData.aicteId) {
                    currentBatch.push(collegeData);
                    count++;

                    if (currentBatch.length >= BATCH_SIZE) {
                        const batchToProcess = [...currentBatch];
                        currentBatch = [];
                        processBatch(batchToProcess).catch(err => console.error('Batch error:', err));
                    }
                }
            })
            .on('end', async () => {
                if (currentBatch.length > 0) {
                    await processBatch(currentBatch);
                }
                console.log(`\nImport completed! Total records processed: ${count}`);
                process.exit(0);
            })
            .on('error', (err) => {
                console.error('CSV Error:', err);
                process.exit(1);
            });

    } catch (err) {
        console.error('Final Error:', err);
        process.exit(1);
    }
};

importColleges();
