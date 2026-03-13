import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import College from './src/models/College.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

async function verifyRefinedSort() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to database');

        const iitRegex = /Indian Institute of Technology|IIT\s|IIT$/i;
        const nitRegex = /National Institute of Technology|NIT\s|NIT$/i;
        const iiitRegex = /Indian Institute of Information Technology|IIIT\s|IIIT$/i;
        const otherIniKeywords = [
            'Indian Institute of Management',
            'All India Institute of Medical Sciences',
            'BITS PILANI',
            'Indian Institute of Science Education and Research',
            'IIM ',
            'AIIMS ',
            'IISER '
        ];
        const otherIniRegex = new RegExp(otherIniKeywords.join('|'), 'i');

        const pipeline = [
            {
                $addFields: {
                    iniScore: {
                        $cond: {
                            if: {
                                $or: [
                                    { $regexMatch: { input: "$name", regex: iitRegex } },
                                    { $regexMatch: { input: "$popularName", regex: iitRegex } }
                                ]
                            },
                            then: 100,
                            else: {
                                $cond: {
                                    if: {
                                        $or: [
                                            { $regexMatch: { input: "$name", regex: nitRegex } },
                                            { $regexMatch: { input: "$popularName", regex: nitRegex } }
                                        ]
                                    },
                                    then: 80,
                                    else: {
                                        $cond: {
                                            if: {
                                                $or: [
                                                    { $regexMatch: { input: "$name", regex: iiitRegex } },
                                                    { $regexMatch: { input: "$popularName", regex: iiitRegex } }
                                                ]
                                            },
                                            then: 60,
                                            else: {
                                                $cond: {
                                                    if: {
                                                        $or: [
                                                            { $regexMatch: { input: "$name", regex: otherIniRegex } },
                                                            { $regexMatch: { input: "$popularName", regex: otherIniRegex } }
                                                        ]
                                                    },
                                                    then: 40,
                                                    else: 0
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            { $sort: { iniScore: -1, name: 1 } },
            { $limit: 15 },
            { $project: { name: 1, iniScore: 1 } }
        ];

        const results = await College.aggregate(pipeline);
        console.log('--- Top 15 Colleges (Refined Priority Sort) ---');
        results.forEach((col, i) => {
            console.log(`${i+1}. [Score: ${col.iniScore}] ${col.name}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
}

verifyRefinedSort();
