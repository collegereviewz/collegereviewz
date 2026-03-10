import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import College from './src/models/College.model.js';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to DB.");

        const college = await College.findOne({ name: "DR. S. & S. S. GHANDHY GOVERNMENT ENGINEERING COLLEGE, SURAT." });
        if (!college) {
            console.log("Not found in DB");
            return;
        }

        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        const prompt = `
        Find the nearest airport, railway station, and bus terminal to the following college:
        College Name: ${college.name}
        District/Location: ${college.district || ''}
        State: ${college.state || ''}

        Return exactly a raw JSON array of objects:
        [
            { "type": "airport", "hubName": "Name", "travelTime": "XX mins" },
            { "type": "railway", "hubName": "Name", "travelTime": "XX mins" },
            { "type": "bus", "hubName": "Name", "travelTime": "XX mins" }
        ]
        `;

        const result = await model.generateContent(prompt);
        let resp = result.response.text();
        console.log("Gemini Raw:", resp);

        resp = resp.replace(/```json/g, '').replace(/```/g, '').trim();
        const start = resp.indexOf('[');
        const end = resp.lastIndexOf(']');
        if (start !== -1 && end !== -1) {
            resp = resp.substring(start, end + 1);
        }

        const data = JSON.parse(resp);
        console.log("Parsed Data:", JSON.stringify(data, null, 2));

        college.commuteIntelligence = data;
        await college.save();
        console.log("Saved to DB!");

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

test();
