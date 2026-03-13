import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import College from './src/models/College.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

async function verifySort() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to database');

        const iniKeywords = [
            'Indian Institute of Technology',
            'National Institute of Technology',
            'Indian Institute of Information Technology',
            'Indian Institute of Management',
            'All India Institute of Medical Sciences',
            'BITS PILANI',
            'Indian Institute of Science Education and Research',
            'IIT ',
            'NIT ',
            'IIIT ',
            'IIM ',
            'AIIMS ',
            'IISER '
        ];

        const pipeline = [
            {
                $addFields: {
                    iniScore: {
                        $cond: {
                            if: {
                                $or: iniKeywords.map(keyword => ({
                                    $regexMatch: { input: "$name", regex: new RegExp(keyword, 'i') }
                                })).concat(iniKeywords.map(keyword => ({
                                    $regexMatch: { input: "$popularName", regex: new RegExp(keyword, 'i') }
                                })))
                            },
                            then: 1,
                            else: 0
                        }
                    }
                }
            },
            { $sort: { iniScore: -1, name: 1 } },
            { $limit: 10 },
            { $project: { name: 1, iniScore: 1 } }
        ];

        const results = await College.aggregate(pipeline);
        console.log('--- Top 10 Colleges (Priority Sort) ---');
        results.forEach((col, i) => {
            console.log(`${i+1}. [Score: ${col.iniScore}] ${col.name}`);
        });

        const nonIniPipeline = [
            {
                $addFields: {
                    iniScore: {
                        $cond: {
                            if: {
                                $or: iniKeywords.map(keyword => ({
                                    $regexMatch: { input: "$name", regex: new RegExp(keyword, 'i') }
                                })).concat(iniKeywords.map(keyword => ({
                                    $regexMatch: { input: "$popularName", regex: new RegExp(keyword, 'i') }
                                })))
                            },
                            then: 1,
                            else: 0
                        }
                    }
                }
            },
            { $match: { iniScore: 0 } },
            { $sort: { name: 1 } },
            { $limit: 3 },
            { $project: { name: 1, iniScore: 1 } }
        ];

        const nonIniResults = await College.aggregate(nonIniPipeline);
        console.log('\n--- Top 3 Non-INI Colleges (Alphabetical) ---');
        nonIniResults.forEach((col, i) => {
            console.log(`${i+1}. [Score: ${col.iniScore}] ${col.name}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
}

verifySort();
