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

const FINAL_CSV_PATH = path.join(__dirname, '../../client/src/pages/ExploreColleges/Full_section.1.csv');

async function importFinalData() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected.');

        const parser = fs.createReadStream(FINAL_CSV_PATH).pipe(parse({
            columns: true,
            skip_empty_lines: true,
            trim: true,
            relax_column_count: true,
            quote: '"',
            escape: '"'
        }));

        let count = 0;
        let matched = 0;
        let created = 0;

        // Patterns for categorization
        const nursingPattern = /nursing|paramedical|physiotherapy|pharmacy/i;
        const mbbsPattern = /medical|medicine|mbbs|aiims|all india institute of medical/i;

        for await (const record of parser) {
            const fullName = record['Full Official Name'];
            const popularName = record['Popular Name/Short Name'];
            const address = record['Complete Address'];
            const website = record['Official College Website Link'];
            const locationType = record['Urban / Semi-Urban / Rural classification'];
            const mapLink = record['Embed Google Map'];

            // Transit Info
            const airport = record['Connectivity: Nearest Airport Name'];
            const railway = record['Connectivity: Nearest Major Railway Station'];
            const bus = record['Connectivity: Nearest Bus Stand'];
            const locality = record['Connectivity: Locality Description'];

            // Language Info
            const teachingLang = record['Medium of Communication Reality: Teaching Language'];
            const patientLang = record['Medium of Communication Reality: OPD Patient Language'];
            const comfortScore = record['Medium of Communication Reality: Regional Comfort Score'];

            if (!fullName) continue;

            count++;

            // Detect categorization
            let isMBBS = false;
            let isNursing = false;
            if (mbbsPattern.test(fullName) && !nursingPattern.test(fullName)) {
                isMBBS = true;
            } else if (nursingPattern.test(fullName)) {
                isNursing = true;
            }

            // Extract State from address if possible
            let state = 'Unknown';
            if (address) {
                const parts = address.split(',');
                if (parts.length > 1) {
                    const lastPart = parts[parts.length - 1].trim();
                    // Remove postal codes and common symbols to get state name
                    state = lastPart.replace(/[0-9–-]/g, '').trim();
                }
            }
            if (!state || state.length < 2) state = 'Unknown';

            const commuteIntelligence = [];
            if (airport && airport.trim()) commuteIntelligence.push({ type: 'airport', hubName: airport.trim(), travelTime: 'See details' });
            if (railway && railway.trim()) commuteIntelligence.push({ type: 'railway', hubName: railway.trim(), travelTime: 'See details' });
            if (bus && bus.trim()) commuteIntelligence.push({ type: 'bus', hubName: bus.trim(), travelTime: 'See details' });

            const updateData = {
                name: fullName.trim(),
                popularName: popularName?.trim() || '',
                address: address?.trim(),
                officialWebsite: website?.trim(),
                managementType: locationType?.trim(),
                mapLink: mapLink?.trim(),
                commuteIntelligence: commuteIntelligence,
                about: `Locality: ${locality || 'N/A'}. \nTeaching Language: ${teachingLang || 'English'}. \nPatient Language: ${patientLang || 'Regional'}. \nComfort Score: ${comfortScore || 'N/A'}`
            };

            const updateOps = { $set: updateData };

            if (isMBBS) {
                updateOps.$addToSet = {
                    courses: {
                        programme: 'Medical',
                        levelOfCourse: 'UG',
                        course: 'MBBS',
                        courseType: 'Full-Time',
                        intake: 0,
                        fees: '—'
                    }
                };
            } else if (isNursing) {
                updateOps.$addToSet = {
                    courses: {
                        programme: 'Nursing',
                        levelOfCourse: 'UG',
                        course: 'B.Sc (Nursing)',
                        courseType: 'Full-Time',
                        intake: 0,
                        fees: '—'
                    }
                };
            }

            // Try to find by name - case insensitive
            const escapedName = fullName.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            const findQuery = {
                name: { $regex: new RegExp(`^${escapedName}$`, 'i') }
            };

            const existing = await College.findOne(findQuery);

            if (existing) {
                await College.updateOne({ _id: existing._id }, updateOps);
                matched++;
            } else {
                const newCollege = {
                    ...updateData,
                    state: state
                };
                if (isMBBS) newCollege.courses = [updateOps.$addToSet.courses];
                else if (isNursing) newCollege.courses = [updateOps.$addToSet.courses];

                await College.create(newCollege);
                created++;
            }

            if (count % 10 === 0) process.stdout.write('.');
            if (count % 500 === 0) console.log(` Processed ${count} records...`);
        }

        console.log(`\nImport complete for Full_section.1.csv`);
        console.log(`Total processed: ${count}`);
        console.log(`Matched (case-insensitive): ${matched}`);
        console.log(`New Colleges Created: ${created}`);
        process.exit(0);
    } catch (error) {
        console.error('Import error:', error);
        process.exit(1);
    }
}

importFinalData();
