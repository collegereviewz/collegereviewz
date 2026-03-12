
import { extractCollegeInfo } from './src/services/gemini.service.js';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
    console.log('Testing IIT Bombay...');
    const data = await extractCollegeInfo('Indian Institute of Technology Bombay');
    console.log(JSON.stringify(data, null, 2));
}

test();
