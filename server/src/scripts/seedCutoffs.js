import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';
import JosaaCutoff from '../models/JosaaCutoff.model.js';
import CsabCutoff from '../models/CsabCutoff.model.js';
import CcmtCutoff from '../models/CcmtCutoff.model.js';
import WbjeeCutoff from '../models/WbjeeCutoff.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const dataDir = path.join(__dirname, '../data/Engg_2025');

const normalizeKey = (key) => key.trim().replace(/\u00A0/g, ' '); // remove non-breaking spaces

async function seedData() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to MongoDB');

        const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.csv'));

        for (const file of files) {
            const filePath = path.join(dataDir, file);
            console.log(`Processing ${file}...`);

            const parts = file.replace('.csv', '').split('_');
            const examType = parts[0].toLowerCase();
            const roundName = parts.slice(1).join(' ').replace(/round/i, 'Round ').trim(); // e.g., 'Round 1'

            const Model = getModelForExam(examType);
            if (!Model) {
                console.log(`Skipping ${file}: No model found for ${examType}`);
                continue;
            }

            // Clear existing data for this round
            await Model.deleteMany({ round: examType.toUpperCase() + ' ' + roundName });
            if (examType === 'ccmt' || examType === 'wbjee') {
                await Model.deleteMany({ round: new RegExp(roundName, 'i') });
            }

            const records = [];

            await new Promise((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(csv({
                        mapHeaders: ({ header }) => normalizeKey(header)
                    }))
                    .on('data', (data) => {
                        const record = mapRecord(examType, roundName, data);
                        if (record && record.institute && record.program && record.round) {
                            records.push(record);
                        } else if (record && record.institute) {
                            // console.log(`Skipping record with missing program/round in ${file}:`, record);
                        }
                    })
                    .on('end', () => resolve())
                    .on('error', reject);
            });

            console.log(`Inserting ${records.length} records into ${Model.modelName}...`);
            // Insert in batches
            const batchSize = 10000;
            for (let i = 0; i < records.length; i += batchSize) {
                const batch = records.slice(i, i + batchSize);
                await Model.insertMany(batch);
                console.log(`Inserted batch ${i / batchSize + 1}`);
            }
        }

        console.log('Seeding completed successfully!');
    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

function getModelForExam(examType) {
    if (examType === 'josaa') return JosaaCutoff;
    if (examType === 'csab') return CsabCutoff;
    if (examType === 'ccmt') return CcmtCutoff;
    if (examType === 'wbjee') return WbjeeCutoff;
    return null;
}

function mapRecord(examType, roundName, data) {
    if (examType === 'josaa' || examType === 'csab') {
        return {
            institute: data['Institute'],
            program: data['Academic Program Name'] || data['Program Name'] || data['Program'],
            quota: data['Quota'],
            seatType: data['Seat Type'],
            gender: data['Gender'],
            openingRank: data['Opening Rank'],
            closingRank: data['Closing Rank'],
            round: examType.toUpperCase() + ' ' + roundName,
            year: '2025'
        };
    } else if (examType === 'ccmt') {
        const roundField = data['Round'] || (examType.toUpperCase() + ' ' + roundName);
        return {
            institute: data['Institute'],
            program: data['PG Program'] || data['Program'],
            group: data['Group'],
            category: data['Category'],
            maxGateScore: data['Max GATE Score'],
            minGateScore: data['Min GATE Score'],
            round: roundField,
            year: '2025'
        };
    } else if (examType === 'wbjee') {
        const roundField = data['Round'] || (examType.toUpperCase() + ' ' + roundName);
        return {
            institute: data['Institute'],
            program: data['Program'],
            stream: data['Stream'],
            seatType: data['Seat Type'],
            quota: data['Quota'],
            category: data['Category'],
            openingRank: data['Opening Rank'],
            closingRank: data['Closing Rank'],
            round: roundField,
            year: '2025'
        };
    }
    return null;
}

seedData();
