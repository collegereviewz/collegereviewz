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

const EXPLORE_COLLEGES_DIR = path.join(__dirname, '../../client/src/pages/ExploreColleges');

const normalize = (s) => s?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';

async function findHeaderRow(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');
    for (let i = 0; i < Math.min(lines.length, 20); i++) {
        const line = lines[i].toLowerCase();
        if ((line.includes('name') || line.includes('official')) && (line.includes('state') || line.includes('aishe') || line.includes('code'))) {
            return i + 1; // 1-indexed for csv-parse
        }
    }
    return 1;
}

async function importFile(filePath) {
    console.log(`\nImporting: ${path.basename(filePath)}`);
    const headerLine = await findHeaderRow(filePath);
    console.log(`Using header at line ${headerLine}`);

    const parser = fs.createReadStream(filePath).pipe(parse({
        columns: true,
        skip_empty_lines: true,
        from_line: headerLine,
        trim: true,
        relax_column_count: true
    }));

    let count = 0;
    let fileOperationsCount = 0;
    let operations = [];
    const BATCH_SIZE = 500;

    for await (const record of parser) {
        const normalizedRecord = {};
        Object.keys(record).forEach(key => {
            normalizedRecord[normalize(key).trim()] = record[key];
        });

        let name = normalizedRecord['name'] || normalizedRecord['fullofficialname'] || normalizedRecord['institutionname'] || normalizedRecord['collegename'];
        if (!name) continue;

        // Strip leading/trailing quotation marks (including smart quotes) and trim
        name = name.replace(/^['"\s“”‘’]+|['"\s“”‘’]+$/g, '').trim();

        // Remove prefixes like "+3 ", "21st Century ", leading colons/numbers
        // 1. Remove "+3" prefix
        name = name.replace(/^\+3\s*/i, '');

        // 2. Remove "21ST CENTURY" if it's treated as a prefix code
        name = name.replace(/^21ST CENTURY\s*/i, '');

        // 3. Clean leading codes like "1285 - ", "1286-", "1280 ", "01.", or "6288:-" 
        // We use a lookahead to avoid stripping "1st", "2nd", etc.
        name = name.replace(/^[0-9]+(?!(?:ST|ND|RD|TH)\b)\s*[.:-]*\s*/i, '').trim();

        // 4. Remove any remaining leading colons or dashes
        name = name.replace(/^[:\s-]+/, '');

        // Re-strip quotes in case stripping prefixes exposed nested quotes
        name = name.replace(/^['"\s“”‘’]+|['"\s“”‘’]+$/g, '').trim();

        // Dynamically strip address components separated by commas
        const parts = name.split(',');
        const prestigeMatch = /^(?:iit|nit|iim|iiit|iiser|aiims|bits|rcciit|srm|vit|indian institute|national institute|all india institute|birla institute)\b/i.test(parts[0].trim());

        if (!prestigeMatch && parts.length > 1) {
            let cleanParts = [parts[0].trim()];
            for (let i = 1; i < parts.length; i++) {
                let p = parts[i].trim();
                // If it looks like an address part, stop taking any more parts
                const addressStrPattern = /\b(?:colony|road|street|cross|block|sector|marg|phase|plot|opp\.?|near|village|taluka|tal\.?|dist\.?|district|tehsil|pin\.?|post|no\.?\s*\d+)\b/i;
                const pinPattern = /-\s*\d{2,6}\b|\b\d{5,6}\b/;

                if (addressStrPattern.test(p) || pinPattern.test(p)) {
                    break;
                }
                cleanParts.push(p);
            }
            name = cleanParts.join(', ').trim();
        }

        const aisheId = normalizedRecord['aishecode'] || normalizedRecord['aisheid'] || normalizedRecord['id'];
        const state = normalizedRecord['state'] || normalizedRecord['statename'] || 'Unknown';
        const district = normalizedRecord['district'] || '';
        const website = normalizedRecord['website'] || normalizedRecord['officialwebsite'] || '';
        const estdYear = normalizedRecord['yearofestablishment'] || normalizedRecord['establishedyear'] || normalizedRecord['estd'] || normalizedRecord['estdyear'] || normalizedRecord['establishmentyear'] || normalizedRecord['year'] || normalizedRecord['yearofestablisment'] || '';
        const institutionType = normalizedRecord['institutiontype'] || normalizedRecord['collegetype'] || '';
        const university = normalizedRecord['universityname'] || normalizedRecord['university'] || '';
        const management = normalizedRecord['management'] || normalizedRecord['managementtype'] || '';
        const address = normalizedRecord['address'] || normalizedRecord['district'] || '';

        // Detect categorization for specialized tabs
        let isMBBS = false;
        let isNursing = false;
        const fileName = path.basename(filePath).toLowerCase();

        // Define patterns
        const nursingPattern = /nursing|paramedical|physiotherapy|pharmacy/i;
        const mbbsPattern = /medical|medicine|mbbs|aiims|all india institute of medical/i;

        if (fileName.includes('aiims') || fileName.includes('mbbs') ||
            (mbbsPattern.test(name) && !nursingPattern.test(name)) ||
            (fileName.includes('medical') && !nursingPattern.test(name))) {
            isMBBS = true;
        } else if (fileName.includes('nursing') || nursingPattern.test(name)) {
            isNursing = true;
        }

        if (!name) return 0; // Skip empty rows
        const updateData = {
            name: name.trim(),
            state: state.trim() || 'Unknown',
            district: district.trim(),
            officialWebsite: website.trim(),
            establishedYear: estdYear.trim(),
            institutionType: institutionType.trim() || (isMBBS ? 'Medical College' : ''),
            university: university.trim(),
            managementType: management.trim(),
            address: address.trim()
        };

        if (aisheId) {
            updateData.aisheId = aisheId.trim();
        }

        let filter = {};
        if (updateData.aisheId) {
            filter = { aisheId: updateData.aisheId };
        } else {
            filter = { name: updateData.name, state: updateData.state };
        }

        const updateOps = { $set: updateData };

        // If MBBS, ensure it has an MBBS course record
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

        operations.push({
            updateOne: {
                filter: filter,
                update: updateOps,
                upsert: true
            }
        });

        if (operations.length >= BATCH_SIZE) {
            await College.bulkWrite(operations);
            fileOperationsCount += operations.length;
            if (fileOperationsCount % 2000 === 0) process.stdout.write('.');
            operations = [];
        }
    }

    if (operations.length > 0) {
        await College.bulkWrite(operations);
        fileOperationsCount += operations.length;
    }
    console.log(`\nFinished ${path.basename(filePath)}. Processed ${fileOperationsCount} records.`);
    return fileOperationsCount;
}

async function main() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected.');

        console.log('Clearing existing college data...');
        await College.deleteMany({});
        console.log('Collection cleared.');

        function getFilesRecursive(dir) {
            let results = [];
            if (!fs.existsSync(dir)) return results;
            const list = fs.readdirSync(dir);
            list.forEach(file => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                if (stat && stat.isDirectory()) {
                    results = results.concat(getFilesRecursive(filePath));
                } else if (file.endsWith('.csv')) {
                    results.push(filePath);
                }
            });
            return results;
        }

        const files = getFilesRecursive(EXPLORE_COLLEGES_DIR);
        console.log(`Found ${files.length} CSV files to process.`);

        for (const filePath of files) {
            await importFile(filePath);
        }

        const finalCount = await College.countDocuments();
        console.log(`\nAll files imported successfully!`);
        console.log(`Final unique database records: ${finalCount}`);
        process.exit(0);
    } catch (error) {
        console.error('Main error:', error);
        process.exit(1);
    }
}

main();
