import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.join(__dirname, '../client/src/pages/ExploreColleges/aisheall.csv');

const content = fs.readFileSync(csvPath, 'utf8');
const lines = content.split(/\r?\n/);

console.log(`Searching for 'ENGINEERING COLLEGE, TUWA'...`);
let found = false;
lines.forEach((line, i) => {
    if (line.toUpperCase().includes('ENGINEERING COLLEGE, TUWA') || line.toUpperCase().includes('TUWA')) {
        console.log(`Line ${i + 1}: ${line}`);
        found = true;
    }
});

if (!found) {
    console.log('Not found in CSV.');
    // Try searching for parts of the name
    console.log('Trying parts...');
    lines.forEach((line, i) => {
        if (line.toUpperCase().includes('TUWA')) {
            console.log(`Line ${i + 1}: ${line}`);
        }
    });
}
