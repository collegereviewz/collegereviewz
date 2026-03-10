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
        if (lines[i].includes('Name') && (lines[i].includes('Aishe Code') || lines[i].includes('State'))) {
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
    let operations = [];
    const BATCH_SIZE = 500;

    for await (const record of parser) {
        // Normalize keys because some CSVs have weird spaces or case
        const normalizedRecord = {};
        Object.keys(record).forEach(key => {
            normalizedRecord[normalize(key)] = record[key];
        });

        const name = record['Name'] || record['name'];
        if (!name) continue;

        const aisheId = record['Aishe Code'] || record['aisheCode'] || record['Aishe code'];
        const state = record['State'] || record['state'];
        const district = record['District'] || record['district'];
        const website = record['Website'] || record['website'] || record['Official Website'];
        const estdYear = record['Year Of Establishment'] || record['Year of Establishment'] || record['yearOfEstablishment'];
        const institutionType = record['Institution Type'] || record['Institution type'] || record['collegeType'] || record['College Type'];
        const university = record['University Name'] || record['universityName'] || record['University'] || record['university'];
        const management = record['Management'] || record['management'] || record['Management Type'];
        const address = record['Address'] || record['address'] || record['District'] || record['district'];

        const updateData = {
            name: name.trim(),
            state: state ? state.trim() : 'Unknown',
            district: district ? district.trim() : '',
            officialWebsite: website ? website.trim() : '',
            establishedYear: estdYear ? estdYear.trim() : '',
            institutionType: institutionType ? institutionType.trim() : '',
            university: university ? university.trim() : '',
            managementType: management ? management.trim() : '',
            address: address ? address.trim() : ''
        };

        if (aisheId) {
            updateData.aisheId = aisheId.trim();
        }

        // Matching logic: prefer aisheId, fallback to name + state
        let filter = {};
        if (updateData.aisheId) {
            filter = { aisheId: updateData.aisheId };
        } else {
            filter = {
                name: updateData.name,
                state: updateData.state
            };
        }

        operations.push({
            updateOne: {
                filter: filter,
                update: { $set: updateData },
                upsert: true
            }
        });

        count++;
        if (operations.length >= BATCH_SIZE) {
            await College.bulkWrite(operations);
            process.stdout.write(`.`);
            operations = [];
        }
    }

    if (operations.length > 0) {
        await College.bulkWrite(operations);
    }
    console.log(`\nFinished ${path.basename(filePath)}. Processed ${count} records.`);
    return count;
}

async function main() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected.');

        const files = fs.readdirSync(EXPLORE_COLLEGES_DIR).filter(f => f.endsWith('.csv'));
        let totalCount = 0;
        console.log(`Found ${files.length} CSV files to process: ${files.join(', ')}`);

        for (const file of files) {
            const filePath = path.join(EXPLORE_COLLEGES_DIR, file);
            totalCount += await importFile(filePath);
        }

        console.log(`\nAll ${files.length} files imported successfully!`);
        console.log(`Total database records processed: ${totalCount}`);
        process.exit(0);
    } catch (error) {
        console.error('Main error:', error);
        process.exit(1);
    }
}

main();
