import axios from 'axios';
import * as cheerio from 'cheerio';
import News from '../models/News.model.js';
import { categorizeNews } from './gemini.service.js';

const NEWS_SOURCES = [
    // General Education
    { name: 'NDTV Education', url: 'https://www.ndtv.com/education' },
    { name: 'Jagran Josh', url: 'https://www.jagranjosh.com/articles-education-ndtv-1469002221-1' },
    { name: 'Careers360', url: 'https://news.careers360.com/' },
    { name: 'Times of India', url: 'https://timesofindia.indiatimes.com/education' },
    // Medical / MBBS
    { name: 'Medical Dialogues', url: 'https://medicaldialogues.in/news/education' },
    // Law
    { name: 'LiveLaw', url: 'https://www.livelaw.in/news-updates' },
    // Engineering / B.Tech
    { name: 'CollegeDekho Engineering', url: 'https://www.collegedekho.com/news/engineering/' },
];

export const scrapeLatestNews = async () => {
    try {
        let allRawNews = [];

        for (const source of NEWS_SOURCES) {
            console.log(`Scraping news from ${source.name}...`);
            try {
                const { data } = await axios.get(source.url, {
                    timeout: 15000,
                    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
                });
                const $ = cheerio.load(data);

                $('a').each((i, el) => {
                    const title = $(el).text().trim();
                    let link = $(el).attr('href');

                    if (title.length > 25 && link) {
                        // Handle relative links
                        if (link.startsWith('/')) {
                            const baseUrl = new URL(source.url).origin;
                            link = baseUrl + link;
                        }

                        if (link.startsWith('http')) {
                            // Category-specific keywords to ensure we pull high-quality items
                            const keywords = /(admission|exam|result|counseling|cutoff|nTA|NEET|JEE|CLAT|UGC|AICTE|university|college|scholarship|pharmacy|nursing|medical|engineering|law|commerce|science|b.sc|btech|mbbs|management|mba|iim|iit|gate|nmat|snap|cuet)/i;

                            if (keywords.test(title)) {
                                if (!allRawNews.find(n => n.link === link)) {
                                    allRawNews.push({ title, link, source: source.name });
                                }
                            }
                        }
                    }
                });
            } catch (err) {
                console.error(`Error scraping ${source.name}:`, err.message);
            }
        }

        // Process top 50 news to ensure full coverage
        const newsToProcess = allRawNews.slice(0, 50);
        if (newsToProcess.length === 0) {
            console.log('No educational news found in this scrape cycle.');
            return;
        }

        console.log(`Categorizing ${newsToProcess.length} items using AI...`);
        const categorizedNews = await categorizeNews(newsToProcess);

        // Map categorized items back to their links
        const finalNewsItems = categorizedNews.map((catItem, index) => ({
            ...catItem,
            link: newsToProcess[index].link,
            source: newsToProcess[index].source,
            updatedAt: new Date()
        }));

        let updatedCount = 0;
        for (const item of finalNewsItems) {
            try {
                if (item.category && item.link) {
                    await News.findOneAndUpdate(
                        { link: item.link },
                        item,
                        { upsert: true, new: true }
                    );
                    updatedCount++;
                }
            } catch (saveErr) {
                console.error("Error saving news item:", saveErr.message);
            }
        }

        console.log(`Successfully updated ${updatedCount} news items in DB.`);
    } catch (error) {
        console.error('News Scraper Service Error:', error.message);
    }
};
