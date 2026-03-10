import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function testSearch() {
    try {
        console.log("Initializing Gemini API with Search Grounding...");
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            tools: [
                {
                    googleSearch: {}
                }
            ]
        });

        const prompt = "What is the exact current date today? Search the web and tell me.";
        console.log("Prompting...");
        const result = await model.generateContent(prompt);
        console.log("Response:", result.response.text());

        // Check grounding metadata if any
        if (result.response.candidates && result.response.candidates[0].groundingMetadata) {
            console.log("Grounding Metadata exists! Search was executed.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

testSearch();
