import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Using gemini-2.0-flash for high speed and reliability
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash'
});

/**
 * Extract fee structure and other details from college-related text
 * @param {string} collegeName - Name of the college
 * @param {string} scrapedText - Scraped text from the college website (optional)
 * @returns {Promise<Object>} - Extracted data
 */
export const extractCollegeInfo = async (collegeName, scrapedText = '', retries = 2) => {
  try {
    const prompt = `
            You are a senior educational data specialist. Your task is to provide a detailed review and rating analysis for ${collegeName}.
            
            Based on your internal training data and any provided text, provide the current estimated aggregate ratings and student feedback for:
            1. Google Reviews (average rating and total count)
            2. Shiksha.com (average rating and total count)
            3. Collegedunia.com (average rating and total count)
            
            Also identify:
            - Exactly 5 specific Pros of ${collegeName} commonly mentioned by students.
            - Exactly 5 specific Cons of ${collegeName} commonly mentioned by students.
            - 2 top textual student reviews (provide author, content, rating, source, and date).

            ${scrapedText ? `I have scraped some website text for context: \n\n ${scrapedText.substring(0, 5000)} \n\n` : ''}
            
            Return the data in this STRICT JSON format:
            {
              "fees": "Average total fees (e.g. 5-8 Lakh)",
              "courses": [
                { "programme": "B.Tech", "course": "CSE", "levelOfCourse": "UG", "fees": "1.5 Lakh" }
              ],
              "avgPackage": "Average package (e.g. 6-8 LPA)",
              "highestPackage": "Highest package (e.g. 40-50 LPA)",
              "reviewStats": {
                "external": {
                  "google": { "rating": 4.5, "count": 1200 },
                  "shiksha": { "rating": 4.2, "count": 850 },
                  "collegedunia": { "rating": 4.3, "count": 1100 }
                },
                "pros": ["Pro description 1", "...", "Pro description 5"],
                "cons": ["Con description 1", "...", "Con description 5"],
                "topReviews": [
                  { "author": "Student Name", "content": "Full review...", "rating": 5, "source": "Shiksha", "date": "Current Year" },
                  { "author": "Student Name", "content": "Full review...", "rating": 4.5, "source": "Collegedunia", "date": "Current Year" }
                ]
              }
            }

            MUST follow these rules:
            - Do NOT return placeholders. Use your knowledge of ${collegeName}.
            - If you are unsure of a count, provide a realistic estimate (e.g. 500+).
            - Ensure Exactly 5 pros and 5 cons are provided.
            - Return ONLY the valid JSON object.
        `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Could not parse JSON from Gemini response');
  } catch (error) {
    console.error(`Gemini API Error (Retries left: ${retries}):`, error.message);
    if (retries > 0 && (error.message.includes('503') || error.message.includes('429') || error.message.includes('Service Unavailable'))) {
      console.log(`Retrying in 5 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      return extractCollegeInfo(collegeName, scrapedText, retries - 1);
    }
    return null;
  }
};

/**
 * Categorize news items using Gemini
 * @param {Array} newsItems - List of raw news items {title, link}
 * @returns {Promise<Array>} - Categorized news items
 */
export const categorizeNews = async (newsItems) => {
  try {
    const prompt = `
            You are an expert Indian Educational News Analyst. Your goal is to map news headlines to specific educational streams.

            STREAMS:
            - "MBBS": Keywords: NEET, Medical, AIIMS, MCC, Doctors, NMC, BDS, Health Minister, MBBS, AYUSH.
            - "BE/B.Tech": Keywords: JEE, JoSAA, Engineering, B.Tech, IIT, NIT, IIIT, NTA, CSAB, COAP.
            - "Law": Keywords: CLAT, Law, NLU, BCI, AIBE, legal education, Judged, Court (education context).
            - "Science": Keywords: B.Sc, M.Sc, Research, KVPY, INSPIRE, Science, ISRO, Physics, Chemistry.
            - "Commerce": Keywords: CA, CMA, CS, MBA, Commerce, CAT, MAT, XAT, Accounts, Finance, IIM.
            - "Pharmacy": Keywords: B.Pharm, D.Pharm, Pharmacy, GPAT, Pharma, PCI.
            - "ME/M.Tech": Keywords: GATE, M.Tech, ME, PG Engineering, bits HD.
            - "B.Sc Nursing": Keywords: Nursing, B.Sc Nursing, ANM, GNM, Nursing Council.

            MANDATORY MAPPING RULES:
            1. If a headline mentions "NEET", it MUST be "MBBS".
            2. If a headline mentions "JEE", "JoSAA", or "IIT", it MUST be "BE/B.Tech".
            3. If a headline mentions "CLAT", it MUST be "Law".
            4. If a headline mentions "Nursing", it MUST be "B.Sc Nursing".
            5. ONLY use "General" as a last resort if it is about general education (like 'School Holidays' or 'US Degrees'). If it relates to any Indian competitive exam or degree, map it to the closest STREAM.

            Input news items:
            ${JSON.stringify(newsItems.map(item => ({ title: item.title })), null, 2)}

            Return a RAW JSON array of objects:
            [
              {
                "category": "one of the STREAMS (MBBS, Law, etc.) or General",
                "type": "Exam Alerts / Admission Alerts / College Alerts",
                "summary": "1-sentence summary (max 12 words)"
              }
            ]
        `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const categorized = JSON.parse(jsonMatch[0]);
      // Merge back with original links
      return newsItems.map((item, index) => ({
        ...item,
        category: categorized[index]?.category || 'General',
        type: categorized[index]?.type || 'News',
        summary: categorized[index]?.summary || item.title
      }));
    }
    return newsItems.map(item => ({ ...item, category: 'General', type: 'News' }));
  } catch (error) {
    console.error('Gemini News Categorization Error:', error.message);
    return newsItems.map(item => ({ ...item, category: 'General', type: 'News' }));
  }
};
