import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        console.log("Listing available models...");
        // This is a guess on how to list models with the SDK, might vary by version
        // Usually it's via a separate client or a specific method
        // Using the fetch API as a backup if SDK doesn't have it easily
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        console.log("Models:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error listing models:", err);
    }
}

listModels();
