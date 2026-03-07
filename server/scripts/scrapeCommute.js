import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import College from '../src/models/College.model.js'; // Adjust path if needed

dotenv.config();

// Access your API key as an environment variable (Make sure to add GEMINI_API_KEY to your .env file)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getCommuteDataFromGemini(collegeName, collegeDistrict, collegeState) {
    try {
        // Use gemini-1.5-flash as it is fast and cheap
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const prompt = `
        Find the nearest airport, railway station, and bus terminal to the following college:
        College Name: ${collegeName}
        District/Location: ${collegeDistrict || ''}
        State: ${collegeState || ''}

        Please provide the average travel time by car from the college to each hub.
        
        Return the result EXACTLY as a JSON array of objects with the following format, and nothing else (no markdown blocks, no \`\`\`json, just the raw array).
        [
            { "type": "airport", "hubName": "Name of Airport", "travelTime": "XX mins" },
            { "type": "railway", "hubName": "Name of Railway Station", "travelTime": "XX mins" },
            { "type": "bus", "hubName": "Name of Bus Terminal", "travelTime": "XX mins" }
        ]
        `;

        const result = await model.generateContent(prompt);
        let responseText = result.response.text();

        // Clean up response if it contains markdown formatting
        responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        // If there's extra text before/after the JSON array, try to extract the array part.
        const arrayStart = responseText.indexOf('[');
        const arrayEnd = responseText.lastIndexOf(']');
        if (arrayStart !== -1 && arrayEnd !== -1 && arrayEnd > arrayStart) {
            responseText = responseText.substring(arrayStart, arrayEnd + 1);
        }

        try {
            const parsedData = JSON.parse(responseText);
            return parsedData;
        } catch (jsonError) {
            console.error(`JSON Parsing error for ${collegeName}: ${jsonError.message}`);
            console.log(`Raw response: ${responseText}`);
            return null;
        }

    } catch (error) {
        console.error(`Error querying Gemini for ${collegeName}:`, error.message);
        return null;
    }
}

async function fetchCommuteDataWithGemini() {
    console.log('Connecting to database...');
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/collegereviewz');
    console.log('Connected.');

    if (!process.env.GEMINI_API_KEY) {
        console.error("ERROR: GEMINI_API_KEY is not defined in your .env file. Please add it and try again.");
        process.exit(1);
    }

    // Find colleges that don't have commute intelligence yet.
    const colleges = await College.find({
        $or: [
            { commuteIntelligence: { $exists: false } },
            { commuteIntelligence: { $size: 0 } }
        ]
    });

    console.log(`Found ${colleges.length} colleges missing commute data to process.`);

    for (let i = 0; i < colleges.length; i++) {
        const college = colleges[i];
        console.log(`[${i + 1}/${colleges.length}] Fetching data for ${college.name}...`);

        const commuteData = await getCommuteDataFromGemini(college.name, college.district, college.state);

        if (commuteData && Array.isArray(commuteData) && commuteData.length > 0) {
            college.commuteIntelligence = commuteData;
            await college.save();
            console.log(`✅ [${i + 1}] Saved commute data for ${college.name}`);
        } else {
            console.log(`⚠️ [${i + 1}] Failed to parse/get data for ${college.name}`);
        }

        // Wait briefly between calls to avoid hitting Gemini rate limits rapidly (Adjust based on your API tier)
        await delay(2000);
    }

    await mongoose.disconnect();
    console.log("\nFinished fetching data using Gemini!");
}

fetchCommuteDataWithGemini().catch(console.error);
