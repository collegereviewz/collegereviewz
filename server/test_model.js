
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function list() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        // listModels is not a function on genAI directly in current version
        // It's usually on the model object or via a different method
        // But let's try gemini-1.5-flash with a simple prompt
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent('test');
        console.log('Model gemini-1.5-flash is working');
    } catch (e) {
        console.log('Error:', e.message);
    }
}
list();
