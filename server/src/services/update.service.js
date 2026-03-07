import axios from 'axios';
import * as cheerio from 'cheerio';
import College from '../models/College.model.js';

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
export const scrapeUpdates = async (domain) => {
    try {
        const url = domain.startsWith('http') ? domain : `https://${domain}`;
        const { data } = await axios.get(url, {
            timeout: 10000,
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const $ = cheerio.load(data);

        const updates = {
            notifications: [],
            news: [],
            events: [],
            fees: null,
            avgPackage: null,
            highestPackage: null,
            lastUpdated: new Date()
        };

        const pageText = $('body').text().replace(/\s+/g, ' ');

        // Basic Regex for Fees (look for "fees", "tuition" followed by numbers/currency)
        const feeMatch = pageText.match(/(?:fees|tuition|total fee|fee structure)[^0-9]*₹?\s*([0-9,]{4,7})/i);
        if (feeMatch) updates.fees = `₹${feeMatch[1]}`;

        // Basic Regex for Placement (look for "average package", "highest package")
        const avgPkgMatch = pageText.match(/(?:average package|avg pkg|placement average)[^0-9]*₹?\s*([0-9,]{5,8})/i);
        if (avgPkgMatch) updates.avgPackage = `₹${avgPkgMatch[1]}`;

        const highPkgMatch = pageText.match(/(?:highest package|highest pkg|max placement)[^0-9]*₹?\s*([0-9,]{5,9})/i);
        if (highPkgMatch) updates.highestPackage = `₹${highPkgMatch[1]}`;

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
    const college = await College.findById(collegeId);
    if (!college) return null;

    let domain = college.officialWebsite || guessDomain(college.name);
    if (!domain) return null;

    if (!college.officialWebsite) college.officialWebsite = domain;

    const scrapedData = await scrapeUpdates(domain);

    // AI Media Fetching (If missing or sparse)
    if (!college.videos || college.videos.length < 2 || !college.photos || college.photos.length < 2) {
        console.log(`Auto-fetching AI media for ${college.name}...`);
        const aiMedia = await fetchMediaWithAI(college.name, college.state);
        if (aiMedia) {
            if (aiMedia.videos && aiMedia.videos.length > 0) college.videos = aiMedia.videos;
            if (aiMedia.photos && aiMedia.photos.length > 0) college.photos = aiMedia.photos;
        }
    }

    if (scrapedData) {
        college.updates = scrapedData;
        if (scrapedData.fees) college.fees = scrapedData.fees;
        if (scrapedData.avgPackage) college.avgPackage = scrapedData.avgPackage;
        if (scrapedData.highestPackage) college.highestPackage = scrapedData.highestPackage;
        await college.save();
        return { updates: scrapedData, mediaFetched: true };
    }

    // Save college even if scraping fails but AI media was found
    await college.save();
    return { updates: null, mediaFetched: true };
};

