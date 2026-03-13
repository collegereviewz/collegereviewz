import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import College from './src/models/College.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

async function verify() {
    await mongoose.connect(process.env.DATABASE_URL);
    const iitRegex = /\b(Indian Institute of Technology|IIT)\b/i;
    const nitRegex = /\b(National Institute of Technology|NIT)\b/i;
    const iiitRegex = /\b(Indian Institute of Information Technology|IIIT)\b/i;
    const otherIniKeywords = ['Indian Institute of Management', 'All India Institute of Medical Sciences', 'BITS PILANI', 'Indian Institute of Science Education and Research', 'IIM ', 'AIIMS ', 'IISER '];
    const otherIniRegex = new RegExp(otherIniKeywords.join('|'), 'i');

    const pipeline = [
        {
            $addFields: {
                iniScore: {
                    $cond: {
                        if: { $or: [{ $regexMatch: { input: "$name", regex: iitRegex } }, { $regexMatch: { input: "$popularName", regex: iitRegex } }] },
                        then: 100,
                        else: {
                            $cond: {
                                if: { $or: [{ $regexMatch: { input: "$name", regex: nitRegex } }, { $regexMatch: { input: "$popularName", regex: nitRegex } }] },
                                then: 80,
                                else: {
                                    $cond: {
                                        if: { $or: [{ $regexMatch: { input: "$name", regex: iiitRegex } }, { $regexMatch: { input: "$popularName", regex: iiitRegex } }] },
                                        then: 60,
                                        else: {
                                            $cond: {
                                                if: { $or: [{ $regexMatch: { input: "$name", regex: otherIniRegex } }, { $regexMatch: { input: "$popularName", regex: otherIniRegex } }] },
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
        { $limit: 10 },
        { $project: { name: 1, iniScore: 1 } }
    ];

    const results = await College.aggregate(pipeline);
    console.log('--- Top 10 Colleges ---');
    results.forEach((c, i) => console.log(`${i+1}. ${c.name} (S:${c.iniScore})`));
    process.exit(0);
}
verify();
