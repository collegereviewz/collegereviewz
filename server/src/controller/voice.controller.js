import axios from 'axios';


/**
 * ElevenLabs TTS Controller
 */
export const textToSpeech = async (req, res) => {
    try {
        const { text } = req.body;
        const apiKey = process.env.ELEVENLABS_API_KEY;

        console.log('--- Voice Request Received ---');
        console.log('Text:', text);
        console.log('API Key present:', !!apiKey);
        if (apiKey) console.log('API Key length:', apiKey.length);

        if (!apiKey || apiKey === 'your_eleven_labs_api_key_here') {
            console.error('Missing or invalid API Key');
            return res.status(400).json({
                message: "ElevenLabs API key is missing or not configured. Please add it to the server .env file."
            });
        }

        // Using "Sarah" - Mature, Reassuring, Confident (Standard Female Voice)
        const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`;

        console.log(`ElevenLabs Request: Voice=${VOICE_ID}, Model=multilingual_v2`);

        const response = await axios({
            method: 'post',
            url: url,
            data: {
                text: text,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75,
                    style: 0.0,
                    use_speaker_boost: true
                }
            },
            headers: {
                'Accept': 'audio/mpeg',
                'xi-api-key': apiKey,
                'Content-Type': 'application/json',
            },
            responseType: 'stream'
        });

        console.log('--- ElevenLabs Stream Started ---');
        console.log('Status Code:', response.status);

        // Set the proper headers for audio streaming
        res.setHeader('Content-Type', 'audio/mpeg');
        response.data.pipe(res);

        response.data.on('end', () => {
            console.log('--- ElevenLabs Stream Finished (Credits should have deducted) ---');
        });

        response.data.on('error', (err) => {
            console.error('--- ElevenLabs Stream Error ---', err);
        });
    } catch (error) {
        console.error('ElevenLabs API Error Details:', error.response ? error.response.data : error.message);
        res.status(500).json({
            message: "Error generating speech",
            error: error.response ? error.response.data : error.message
        });
    }
};

/**
 * Hardcoded Sarah AI Chat Controller
 */
export const chatWithAI = async (req, res) => {
    try {
        const { text } = req.body;
        const query = (text || "").toLowerCase().trim();

        console.log('--- hardcoded AI Chat Request Received ---');
        console.log('User Text:', query);

        // Predefined Responses Database
        const responses = [
            {
                keywords: ['hello', 'hi', 'hey', 'greetings'],
                response: "Hello! I'm Sarah, your college admissions assistant. How can I help you find the perfect college today?"
            },
            {
                keywords: ['neet', 'medical', 'mbbs', 'counselling', 'counseling'],
                response: "I can certainly help with NEET counselling and MBBS admissions. We have detailed information about cutoffs, seat matrices, and college rankings. Which state or college are you interested in?"
            },
            {
                keywords: ['jee', 'engineering', 'iit', 'nit', 'btech'],
                response: "For engineering aspirants, I can provide insights on JEE Main and Advanced counselling, including branch-wise cutoffs for top colleges. Are you looking for specific college reviews?"
            },
            {
                keywords: ['admission', 'apply', 'procedure', 'process'],
                response: "The admission process varies by college and exam. Generally, you'll need to participate in centralized counselling like MCC for NEET or JoSAA for JEE. Would you like me to guide you through the registration steps?"
            },
            {
                keywords: ['scholarship', 'financial aid', 'fee'],
                response: "We have a dedicated section for scholarships on CollegeReviewZ. Many colleges offer merit-based and need-based financial aid. You can check the 'Scholarships' tab in our menu for more details."
            },
            {
                keywords: ['who are you', 'your name', 'about you', 'who is sarah'],
                response: "I'm Sarah, your virtual assistant for CollegeReviewZ. I'm here to simplify the complex world of college admissions and reviews for you."
            },
            {
                keywords: ['help', 'what can you do', 'features'],
                response: "I can help you explore college reviews, understand admission processes, track exam updates, and find scholarships. Just ask me about any college or entrance exam!"
            },
            {
                keywords: ['thank', 'thanks', 'bye', 'goodbye'],
                response: "You're very welcome! Feel free to reach out anytime you have more questions. Good luck with your college journey!"
            }
        ];

        // Match Query
        let matchedResponse = null;
        for (const item of responses) {
            if (item.keywords.some(keyword => query.includes(keyword))) {
                matchedResponse = item.response;
                break;
            }
        }

        // Default Fallback
        const aiResponse = matchedResponse || "That's an interesting question! While I'm primarily focused on college admissions and reviews here at CollegeReviewZ, I'm always learning. For specific details on that, you might want to check our latest updates or official notification section.";

        console.log('Sarah Response:', aiResponse);
        res.json({ response: aiResponse });

    } catch (error) {
        console.error('Sarah AI Logic Error:', error.message);
        res.status(500).json({
            message: "Error processing Sarah's response",
            error: error.message
        });
    }
};
