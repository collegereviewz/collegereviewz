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

const AISHE_CSV_PATH = path.join(__dirname, '../../client/src/pages/ExploreColleges/aisheall.csv');

const normalize = (s) => s?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';

async function importData() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected.');

        // 1. Load existing colleges into memory for fast matching
        console.log('Fetching existing colleges for caching...');
        const existingColleges = await College.find({}, { name: 1, state: 1, aisheId: 1, aicteId: 1 }).lean();

        const aisheSet = new Set();
        const nameStateMap = new Map(); // key: "name|state", value: _id

        existingColleges.forEach(c => {
            if (c.aisheId) aisheSet.add(c.aisheId);
            if (c.name && c.state) {
                const nameKey = normalize(c.name);
                const stateKey = normalize(c.state);
                const key = `${nameKey}|${stateKey}`;
                nameStateMap.set(key, c._id);
            }
        });
        console.log(`Cached ${existingColleges.length} colleges.`);

        const parser = fs.createReadStream(AISHE_CSV_PATH).pipe(parse({
            columns: [
                'aisheCode', 'name', 'state', 'district', 'website',
                'yearOfEstablishment', 'location', 'collegeType', 'management',
                'universityAisheCode', 'universityName', 'universityType'
            ],
            skip_empty_lines: true,
            from_line: 2,
            trim: true
        }));

        let count = 0;
        let operations = [];
        const BATCH_SIZE = 1000;

        for await (const record of parser) {
            count++;
            const rawName = record.name;
            if (!rawName) continue;

            const aisheCode = record.aisheCode?.trim();
            const state = record.state?.trim();

            const nameMatch = rawName.match(/^[a-zA-Z0-9]+-(.+)$/); // Handle prefixes like C-12345- or 12345-
            const cleanName = nameMatch ? nameMatch[1].trim() : rawName.trim();
            const normalizedName = normalize(cleanName);
            const normalizedState = normalize(state);
            const key = `${normalizedName}|${normalizedState}`;

            const isTarget = normalizedName.includes('tuwa') || normalizedName.includes('gardi') || normalizedName.includes('vijapurwala');
            if (isTarget) {
                console.log(`\n[DEBUG] Found target in CSV: "${cleanName}" (${normalizedName})`);
            }

            const updateData = {
                aisheId: aisheCode,
                state: state,
                district: record.district?.trim(),
                university: record.universityName?.trim(),
                universityAisheCode: record.universityAisheCode?.trim(),
                officialWebsite: record.website?.trim(),
                establishedYear: record.yearOfEstablishment?.trim(),
                managementType: record.management?.trim(),
                institutionType: record.collegeType?.trim(),
                address: record.district?.trim()
            };

            // Matching logic
            let matchId = null;
            if (aisheCode && aisheSet.has(aisheCode)) {
                // If we match by aisheCode, we should still update the record
                // Find the _id for this aisheCode
                const matchedCol = existingColleges.find(c => c.aisheId === aisheCode);
                if (matchedCol) matchId = matchedCol._id;
            } else if (nameStateMap.has(key)) {
                matchId = nameStateMap.get(key);
            }

            // Fuzzy/Prefix fallback if still no match
            if (!matchId && normalizedName.length > 10) {
                const candidates = existingColleges.filter(c => normalize(c.state) === normalizedState);
                const bestMatch = candidates.find(c => {
                    const dbNameNorm = normalize(c.name);
                    return dbNameNorm.length > 5 && (normalizedName.startsWith(dbNameNorm) || dbNameNorm.startsWith(normalizedName));
                });
                if (bestMatch) matchId = bestMatch._id;
            }

            if (isTarget) {
                console.log(`[DEBUG] Final matchId for target: ${matchId || 'NONE'}`);
                if (!matchId) {
                    // Log some local candidates in DB to see why they didn't match
                    const dbCandidates = existingColleges.filter(c => normalize(c.state) === normalizedState);
                    console.log(`[DEBUG] Candidates in DB for state "${state}": ${dbCandidates.length}`);
                    dbCandidates.slice(0, 5).forEach(c => {
                        console.log(`  - DB: "${c.name}" (${normalize(c.name)})`);
                    });
                }
            }

            if (matchId) {
                operations.push({
                    updateOne: {
                        filter: { _id: matchId },
                        update: { $set: updateData }
                    }
                });
            } else {
                // New record
                operations.push({
                    insertOne: {
                        document: {
                            ...updateData,
                            name: cleanName
                        }
                    }
                });
            }

            if (operations.length >= BATCH_SIZE) {
                process.stdout.write(`Writing batch at record ${count}... `);
                await College.bulkWrite(operations);
                process.stdout.write('Done.\n');
                operations = [];
            }
        }

        if (operations.length > 0) {
            console.log(`Writing final batch...`);
            await College.bulkWrite(operations);
        }

        console.log(`Import complete.`);
        console.log(`Total records processed: ${count}`);
        process.exit(0);
    } catch (error) {
        console.error('Import error:', error);
        process.exit(1);
    }
}

importData();
