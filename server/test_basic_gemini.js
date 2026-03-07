import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // try older model
        const result = await model.generateContent("hello");
        console.log("Response:", result.response.text());
    } catch (err) {
        console.error("Error:", err);
    }
}

test();
