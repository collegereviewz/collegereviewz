import axios from 'axios';
import * as cheerio from 'cheerio';
import College from '../models/College.model.js';
import { extractCollegeInfo } from './gemini.service.js';

import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


/**
 * Heuristic to guess official website domain from college name
 */
export const guessDomain = (name) => {
    if (!name) return null;
    const n = name.toUpperCase();

    const mappings = {
        'IIT DELHI': 'iitd.ac.in',
        'AIIMS NEW DELHI': 'aiims.edu',
        'IIM AHMEDABAD': 'iima.ac.in',
        'NIT TRICHY': 'nitt.edu',
        'BITS PILANI': 'bits-pilani.ac.in',
        'MANIPAL UNIVERSITY': 'manipal.edu',
        'IIT BOMBAY': 'iitb.ac.in',
        'SRM UNIVERSITY': 'srmist.edu.in',
        'VIT VELLORE': 'vit.ac.in',
        'LPU': 'lpu.in',
        'AMITY UNIVERSITY': 'amity.edu',
        'DELHI UNIVERSITY': 'du.ac.in',
        'IIT MADRAS': 'iitm.ac.in',
        'IIT KANPUR': 'iitk.ac.in',
        'IIT KHARAGPUR': 'iitkgp.ac.in',
        'IIT ROORKEE': 'iitr.ac.in',
        'IIT GUWAHATI': 'iitg.ac.in',
        'JNU NEW DELHI': 'jnu.ac.in',
        'BHU VARANASI': 'bhu.ac.in',
        'SYMBIOSIS INSTITUTE OF TECHNOLOGY': 'sitpune.edu.in',
        'SVKMS NMIMS DEEMED TO BE UNIVERSITY': 'nmims.edu',
        'GOSWAMI GANESH DUTTA SANATAN DHARMA COLLEGE': 'ggdsd.ac.in',
        'YUGANTAR INSTITUTE OF TECHNOLOGY AND MANAGEMENT': 'yitmindia.ac.in',
        'CHANDIGARH UNIVERSITY': 'cuchd.in',
        'THAPAR UNIVERSITY': 'thapar.edu',
        'PECH UNIVERSITY': 'pec.ac.in',
        'PANJAB UNIVERSITY': 'puchd.ac.in'
    };

    if (mappings[n]) return mappings[n];

    // Pattern based guessing for common prefixes/suffixes
    if (n.includes('NMIMS')) return 'nmims.edu';
    if (n.includes('BITS PILANI')) return 'bits-pilani.ac.in';
    if (n.includes('VIT VELLORE')) return 'vit.ac.in';
    if (n.includes('SRM')) return 'srmist.edu.in';
    if (n.includes('AMITY')) return 'amity.edu';
    if (n.includes('LPU')) return 'lpu.in';

    // Generic slug guess (useful for many ac.in / edu.in sites)
    // "Indian Institute of Technology Delhi" -> iitd.ac.in (handled above, but for others)
    const words = n.split(' ').filter(w => w.length > 2);
    if (words.length > 0) {
        const slug = words[0].toLowerCase();
        if (n.includes('TECHNOLOGY') || n.includes('SCIENCE') || n.includes('INSTITUTE')) {
            // No action needed here yet, just common keywords
        }
    }

    return null;
};

/**
 * Scraping logic for news/notifications/events
 */
export const scrapeUpdates = async (domain, collegeName = '', skipAI = false) => {
    try {
        const url = domain.startsWith('http') ? domain : `https://${domain}`;
        const { data } = await axios.get(url, {
            timeout: 15000,
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const $ = cheerio.load(data);

        const updates = {
            notifications: [],
            news: [],
            events: [],
            fees: null,
            courses: [],
            avgPackage: null,
            highestPackage: null,
            lastUpdated: new Date()
        };

        const pageText = $('body').text().replace(/\s+/g, ' ');

        // Use AI if collegeName is provided and we really need data
        if (collegeName && !skipAI) {
            console.log(`Using Gemini to extract info for ${collegeName}...`);
            const aiData = await extractCollegeInfo(collegeName, pageText);
            if (aiData) {
                if (aiData.fees) updates.fees = aiData.fees;
                if (aiData.courses) updates.courses = aiData.courses;
                if (aiData.avgPackage) updates.avgPackage = aiData.avgPackage;
                if (aiData.highestPackage) updates.highestPackage = aiData.highestPackage;
            }
        }

        // Fallback or additional Scraping for basic links (always useful)
        $('a').each((i, el) => {
            const text = $(el).text().trim();
            const href = $(el).attr('href');
            if (!text || !href) return;

            const fullHref = href.startsWith('http') ? href : `${url}/${href.replace(/^\//, '')}`;
            const t = text.toLowerCase();
            const h = href.toLowerCase();

            const item = { title: text, link: fullHref, date: new Date().toLocaleDateString() };

            const isNotice = /(notification|notice|announcement|circular|update|admission|latest)/i.test(t) || /(notice|anno|admission)/i.test(h);
            const isNews = /(news|press|media|bulletin|highlight|article)/i.test(t) || /news/i.test(h);
            const isEvent = /(event|workshop|seminar|webinar|conference|celebration|activity)/i.test(t) || /event/i.test(h);

            if (isNotice) {
                if (updates.notifications.length < 8) updates.notifications.push(item);
            } else if (isNews) {
                if (updates.news.length < 8) updates.news.push(item);
            } else if (isEvent) {
                if (updates.events.length < 8) updates.events.push(item);
            }
        });

        if (updates.notifications.length === 0 && updates.news.length === 0) {
            updates.news.push({ title: 'Visit official website for latest updates', link: url, date: 'Live' });
        }

        return updates;
    } catch (error) {
        console.error(`Scraping error for ${domain}:`, error.message);
        return null;
    }
};

/**
 * AI-powered fetching of photos and videos using Gemini Google Search
 */
export const fetchMediaWithAI = async (collegeName, state) => {
    try {
        if (!process.env.GEMINI_API_KEY) return null;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            tools: [{ googleSearch: {} }]
        });

        const prompt = `Find 3-5 high-quality YouTube video URLs and 4-6 high-quality campus photo URLs (Unsplash or official) for "${collegeName}, ${state}".
        Return ONLY a JSON object with "photos" and "videos" arrays. 
        Example: {"photos": ["url1", "url2"], "videos": ["url1", "url2"]}
        Respond with raw JSON only.`;

        const result = await model.generateContent(prompt);
        let text = result.response.text();

        // Clean up markdown
        if (text.includes('```')) {
            text = text.replace(/```json|```/g, '').trim();
        }

        const media = JSON.parse(text);
        return media;
    } catch (error) {
        console.error(`AI Media fetching error for ${collegeName}:`, error.message);
        return null;
    }
};


/**
 * Update a specific college by ID
 */
export const updateCollegeData = async (collegeId) => {
    try {
        const college = await College.findById(collegeId);
        if (!college) return null;

        let domain = college.officialWebsite || guessDomain(college.name);
        if (!domain) {
            // Even without domain, we can try Gemini "research"
            console.log(`No domain found for ${college.name}, trying Gemini research direct...`);
            const aiData = await extractCollegeInfo(college.name);
            if (aiData) {
                if (aiData.fees) college.fees = aiData.fees;
                if (aiData.courses && aiData.courses.length > 0) college.courses = aiData.courses;
                if (aiData.avgPackage) college.avgPackage = aiData.avgPackage;
                if (aiData.highestPackage) college.highestPackage = aiData.highestPackage;
                college.updates = { ...college.updates, lastUpdated: new Date() };
                await college.save();
                return college.updates;
            }
            return null;
        }

        if (!college.officialWebsite) college.officialWebsite = domain;

        const skipAI = college.fees && college.fees !== "Check Website" && (new Date() - new Date(college.updates?.lastUpdated || 0)) < 24 * 60 * 60 * 1000;
        
        const scrapedData = await scrapeUpdates(domain, college.name, skipAI);

        if (scrapedData) {
            college.updates = scrapedData;
            if (scrapedData.fees) college.fees = scrapedData.fees;
            if (scrapedData.courses && scrapedData.courses.length > 0) college.courses = scrapedData.courses;
            if (scrapedData.avgPackage) college.avgPackage = scrapedData.avgPackage;
            if (scrapedData.highestPackage) college.highestPackage = scrapedData.highestPackage;
        }

        // AGGRESSIVE FALLBACK: If fees are still missing or too simple after scraping, and we haven't updated recently
        if ((!college.fees || college.fees.length < 5 || college.fees === "Check Website") && !skipAI) {
            console.log(`Fees missing/poor for ${college.name} after scraping. Triggering deep Gemini research...`);
            const aiData = await extractCollegeInfo(college.name);
            if (aiData) {
                if (aiData.fees) college.fees = aiData.fees;
                if (aiData.courses && aiData.courses.length > 0) college.courses = aiData.courses;
                if (aiData.avgPackage) college.avgPackage = aiData.avgPackage;
                if (aiData.highestPackage) college.highestPackage = aiData.highestPackage;
            }
        }

        college.updates.lastUpdated = new Date();
        await college.save();
        return college.updates;
    } catch (err) {
        console.error(`Update Error for ${collegeId}:`, err.message);
        return null;
    }
};

