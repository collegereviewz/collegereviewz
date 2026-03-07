import { extractCollegeInfo } from './src/services/gemini.service.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function testScraper() {
    const collegeName = "IIT Bombay";
    console.log(`Testing Gemini Scraper for: ${collegeName}...`);
    const data = await extractCollegeInfo(collegeName);
    console.log("Extracted Data:", JSON.stringify(data, null, 2));
}

testScraper();
