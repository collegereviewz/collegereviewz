import College from '../models/College.model.js';
import Review from '../models/Review.model.js';
import JosaaCutoff from '../models/JosaaCutoff.model.js';
import CsabCutoff from '../models/CsabCutoff.model.js';
import CcmtCutoff from '../models/CcmtCutoff.model.js';
import WbjeeCutoff from '../models/WbjeeCutoff.model.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const getColleges = async (req, res) => {
    try {
        const { page = 1, limit = 5, search = '', state = 'All', course = 'All', stream = 'All' } = req.query;

        const query = {};

        let scoreStage;

        // Search by name, popular name, or location
        if (search) {
            const cleanSearch = search.trim();
            const searchUpper = cleanSearch.toUpperCase();

            // 1. Expand standard acronyms to Full Forms
            const acronymMap = {
                'IIT': 'Indian Institute of Technology',
                'NIT': 'National Institute of Technology',
                'IIM': 'Indian Institute of Management',
                'IIIT': 'Indian Institute of Information Technology',
                'AIIMS': 'All India Institute of Medical Sciences',
                'IISER': 'Indian Institute of Science Education and Research',
                'BITS': 'Birla Institute of Technology and Science',
                'RCCIIT': 'RCC Institute of Information Technology',
                'SRM': 'SRM Institute of Science and Technology',
                'VIT': 'Vellore Institute of Technology'
            };

            let expandedTerm = null;
            const words = searchUpper.split(/[\s\.-]+/);
            const firstWord = words[0];

            if (acronymMap[searchUpper]) {
                expandedTerm = acronymMap[searchUpper];
            } else if (acronymMap[firstWord]) {
                // e.g. 'IIT Bombay' -> 'Indian Institute of Technology Bombay'
                const restOfSearch = cleanSearch.substring(firstWord.length).trim();
                const cleanRest = restOfSearch.replace(/^[\.-]+/, '').trim(); // Remove leading dots/dashes
                expandedTerm = `${acronymMap[firstWord]} ${cleanRest}`;
            }

            // 2. Build precise short-form matching (handles dots, spaces, e.g. "G.L.A" or "GLA")
            // This requires the match to be an independent word or phrase, avoiding substring matches inside larger words
            const generateFlexiblePattern = (str) => {
                const clean = str.replace(/[\s\.-]/g, '');
                if (clean.length === 0) return null;
                // e.g. "GLA" -> "G[\s\.\-_]*L[\s\.\-_]*A"
                const pattern = clean.split('').map(char =>
                    char.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '[\\s\\.\\-_]*'
                ).join('');
                // Use word boundaries \b to ensure "GLA" doesn't match "Bangla"
                return new RegExp(`\\b${pattern}`, 'i');
            };

            // Basic full word regexes, escape special characters to avoid dots acting as wildcards
            const escapedSearch = cleanSearch.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            const mainReg = new RegExp(`\\b${escapedSearch}`, 'i');
            const mainFlexReg = generateFlexiblePattern(cleanSearch);

            query.$or = [
                { name: { $regex: mainReg } },
                { popularName: { $regex: mainReg } },
                { district: { $regex: mainReg } },
                { state: { $regex: mainReg } }
            ];

            // Add the flexible acronymmatcher (useful for G.L.A, R.C.C, S.R.M)
            if (mainFlexReg) {
                query.$or.push({ name: { $regex: mainFlexReg } });
                query.$or.push({ popularName: { $regex: mainFlexReg } });
            }

            // If we found a known expansion (like IIT -> Indian Institute of Technology)
            let flexibleExpanded = '';
            if (expandedTerm) {
                // To allow commas or hyphens between words (e.g. "Technology, Bombay"), make spaces flexible
                flexibleExpanded = expandedTerm.split(/\s+/).map(w => w.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join('[\\s\\W_]+');
                const expandedReg = new RegExp(`\\b${flexibleExpanded}`, 'i');
                query.$or.push({ name: { $regex: expandedReg } });
                query.$or.push({ popularName: { $regex: expandedReg } });
            }

            // Calculate a basic relevance score for search sorting
            // Give highest score (20) if name starts with the expanded term
            // Give high score (10) if name starts with the short term
            const escapedSearchBoundary = `^${escapedSearch}\\b`;
            const shortRegex = new RegExp(escapedSearchBoundary, 'i');

            if (expandedTerm) {
                const escapedExpandedBoundary = `^${flexibleExpanded}\\b`;
                const expandedRegex = new RegExp(escapedExpandedBoundary, 'i');

                scoreStage = {
                    $addFields: {
                        relevanceScore: {
                            $cond: {
                                if: { $regexMatch: { input: "$name", regex: expandedRegex } },
                                then: 20,
                                else: {
                                    $cond: {
                                        if: { $regexMatch: { input: "$popularName", regex: expandedRegex } },
                                        then: 18,
                                        else: {
                                            $cond: {
                                                if: { $regexMatch: { input: "$name", regex: shortRegex } },
                                                then: 10,
                                                else: {
                                                    $cond: {
                                                        if: { $regexMatch: { input: "$popularName", regex: shortRegex } },
                                                        then: 8,
                                                        else: 0
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
            } else {
                scoreStage = {
                    $addFields: {
                        relevanceScore: {
                            $cond: {
                                if: { $regexMatch: { input: "$name", regex: shortRegex } },
                                then: 10,
                                else: {
                                    $cond: {
                                        if: { $regexMatch: { input: "$popularName", regex: shortRegex } },
                                        then: 8,
                                        else: 0
                                    }
                                }
                            }
                        }
                    }
                };
            }
        } else {
            scoreStage = { $addFields: { relevanceScore: 0 } };
        }

        // Add INI Score for prioritization of IITs, NITs, etc.
        const iitRegex = /\b(Indian Institute of Technology|IIT)\b/i;
        const nitRegex = /\b(National Institute of Technology|NIT)\b/i;
        const iiitRegex = /\b(Indian Institute of Information Technology|IIIT)\b/i;
        const otherIniKeywords = [
            'Indian Institute of Management',
            'All India Institute of Medical Sciences',
            'BITS PILANI',
            'Indian Institute of Science Education and Research',
            'IIM ',
            'AIIMS ',
            'IISER '
        ];

        const otherIniRegex = new RegExp(otherIniKeywords.join('|'), 'i');

        const iniScoreStage = {
            $addFields: {
                iniScore: {
                    $cond: {
                        if: {
                            $or: [
                                { $regexMatch: { input: "$name", regex: iitRegex } },
                                { $regexMatch: { input: "$popularName", regex: iitRegex } }
                            ]
                        },
                        then: 100,
                        else: {
                            $cond: {
                                if: {
                                    $or: [
                                        { $regexMatch: { input: "$name", regex: nitRegex } },
                                        { $regexMatch: { input: "$popularName", regex: nitRegex } }
                                    ]
                                },
                                then: 80,
                                else: {
                                    $cond: {
                                        if: {
                                            $or: [
                                                { $regexMatch: { input: "$name", regex: iiitRegex } },
                                                { $regexMatch: { input: "$popularName", regex: iiitRegex } }
                                            ]
                                        },
                                        then: 60,
                                        else: {
                                            $cond: {
                                                if: {
                                                    $or: [
                                                        { $regexMatch: { input: "$name", regex: otherIniRegex } },
                                                        { $regexMatch: { input: "$popularName", regex: otherIniRegex } }
                                                    ]
                                                },
                                                then: 40,
                                                else: 0
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        // Filter by state
        if (state && state !== 'All') {
            query.state = { $regex: new RegExp(`^${state}$`, 'i') };
        }

        // Filter by course/stream inside the courses array
        if (course && course !== 'All' && course !== 'AICTE Approved') {
            let courseRegex;
            if (course === 'BE/B.Tech') {
                courseRegex = /Engineering|B.E.|B.Tech/i;
            } else if (course === 'MBBS' || course === 'B.Sc (Nursing)') {
                courseRegex = /Medicine|Nursing|MBBS/i;
            } else {
                courseRegex = new RegExp(course, 'i');
            }
            query.courses = { $elemMatch: { course: courseRegex } };
        }

        // Filter by specific program/stream drop-down
        if (stream && stream !== 'All' && stream !== '--All--') {
            const streamMatch = { $elemMatch: { programme: new RegExp(stream, 'i') } };
            if (query.courses) {
                query.courses.$elemMatch.programme = new RegExp(stream, 'i');
            } else {
                query.courses = streamMatch;
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Simple but memory-safe pipeline
        const pipeline = [
            { $match: query },
            scoreStage,
            iniScoreStage,
            // Step 1: Smallest possible projection for sorting + Scoring
            { $project: { _id: 1, name: 1, relevanceScore: 1, iniScore: 1 } },
            { $sort: { relevanceScore: -1, iniScore: -1, name: 1 } },
            { $skip: skip },
            { $limit: parseInt(limit) },
            // Step 2: Hydrate full details only for the paginated results
            {
                $lookup: {
                    from: 'colleges',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'fullDoc'
                }
            },
            { $unwind: "$fullDoc" },
            { $replaceRoot: { newRoot: "$fullDoc" } },
            // Step 3: Attach review stats
            {
                $lookup: {
                    from: 'reviews',
                    let: { college_id: '$_id', college_name: '$name' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        { $eq: ['$collegeId', '$$college_id'] },
                                        { $eq: ['$collegeName', '$$college_name'] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'collegeReviews'
                }
            },
            {
                $addFields: {
                    rating: { $ifNull: [{ $avg: '$collegeReviews.rating' }, 0] },
                    reviewsCount: { $size: '$collegeReviews' }
                }
            },
            { $project: { collegeReviews: 0 } }
        ];

        const colleges = await College.aggregate(pipeline).allowDiskUse(true);
        const total = await College.countDocuments(query);

        res.json({
            success: true,
            data: colleges,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalColleges: total
        });
    } catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

export const getCollegeStats = async (req, res) => {
    try {
        const { name } = req.params;
        const escapedName = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        const college = await College.findOne({
            $or: [
                { name: { $regex: new RegExp(`^${escapedName}$`, 'i') } },
                { name: { $regex: new RegExp(name.split(' - ')[0], 'i') } }
            ]
        }).lean();

        if (!college) {
            return res.status(404).json({ success: false, message: 'College not found' });
        }

        const statsPipeline = [
            { $match: { collegeId: college._id } },
            {
                $group: {
                    _id: '$collegeId',
                    averageRating: { $avg: '$rating' },
                    totalReviews: { $sum: 1 }
                }
            }
        ];

        const stats = await Review.aggregate(statsPipeline);

        res.json({
            success: true,
            data: {
                ...college,
                rating: stats.length > 0 ? stats[0].averageRating : 0,
                reviewsCount: stats.length > 0 ? stats[0].totalReviews : 0
            }
        });
    } catch (error) {
        console.error('Error fetching college stats:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

export const getCollegeById = async (req, res) => {
    try {
        const { id } = req.params;
        const college = await College.findById(id).lean();

        if (!college) {
            return res.status(404).json({ success: false, message: 'College not found' });
        }

        const statsPipeline = [
            { $match: { collegeId: college._id } },
            {
                $group: {
                    _id: '$collegeId',
                    averageRating: { $avg: '$rating' },
                    totalReviews: { $sum: 1 }
                }
            }
        ];

        const stats = await Review.aggregate(statsPipeline);

        res.json({
            success: true,
            data: {
                ...college,
                rating: stats.length > 0 ? stats[0].averageRating : 0,
                reviewsCount: stats.length > 0 ? stats[0].totalReviews : 0
            }
        });
    } catch (error) {
        console.error('Error fetching college by ID:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};


export const updateCollege = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const college = await College.findByIdAndUpdate(id, updates, { new: true });

        if (!college) {
            return res.status(404).json({ success: false, message: 'College not found' });
        }

        res.json({
            success: true,
            message: 'College updated successfully',
            data: college
        });
    } catch (error) {
        console.error('Error updating college:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

export const getCollegeCourses = async (req, res) => {
    try {
        const { name } = req.params;

        // Find the single record for this college
        const college = await College.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } })
            .select('courses')
            .lean();

        if (!college || !college.courses || college.courses.length === 0) {
            return res.status(404).json({ success: false, message: 'No courses found for this college' });
        }

        res.json({
            success: true,
            data: college.courses
        });
    } catch (error) {
        console.error('Error fetching college courses:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

export const getCollegeDetails = async (req, res) => {
    try {
        const { name } = req.params;

        // Use aggregation to get the college WITH review stats in one go
        const pipeline = [
            { $match: { name: { $regex: new RegExp(`^${name}$`, 'i') } } },
            {
                $lookup: {
                    from: 'reviews',
                    let: { college_id: '$_id', college_name: '$name' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        { $eq: ['$collegeId', '$$college_id'] },
                                        { $eq: ['$collegeName', '$$college_name'] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'collegeReviews'
                }
            },
            {
                $addFields: {
                    rating: { $ifNull: [{ $avg: '$collegeReviews.rating' }, 0] },
                    reviewsCount: { $size: '$collegeReviews' }
                }
            },
            {
                $project: {
                    collegeReviews: 0
                }
            }
        ];

        const results = await College.aggregate(pipeline);

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'College not found' });
        }

        res.json({
            success: true,
            data: results[0]
        });
    } catch (error) {
        console.error('Error fetching college details:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

export const getCollegeCommute = async (req, res) => {
    try {
        const { id } = req.params;
        const college = await College.findById(id);

        if (!college) {
            return res.status(404).json({ success: false, message: 'College not found' });
        }

        // Return existing data if available
        if (college.commuteIntelligence && college.commuteIntelligence.length > 0) {
            return res.json({ success: true, data: college.commuteIntelligence });
        }

        // Verify API Key
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ success: false, message: 'Gemini API keys are not configured properly' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


        const prompt = `
        Find the nearest airport, railway station, and bus terminal to the following college:
        College Name: ${college.name}
        District/Location: ${college.district || ''}
        State: ${college.state || ''}

        Please provide the average travel time by car from the college to each hub.
        
        Return the result EXACTLY as a JSON array of objects with the following format, and nothing else (no markdown blocks, no \`\`\`json, just the raw array).
        [
            { "type": "airport", "hubName": "Name of Airport", "travelTime": "XX mins" },
            { "type": "railway", "hubName": "Name of Railway Station", "travelTime": "XX mins" },
            { "type": "bus", "hubName": "Name of Bus Terminal", "travelTime": "XX mins" }
        ]
        `;

        const result = await model.generateContent(prompt);
        let responseText = result.response.text();
        responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        const parsedData = JSON.parse(responseText);

        // Update in database
        college.commuteIntelligence = parsedData;
        await college.save();

        res.json({ success: true, data: parsedData });
    } catch (error) {
        console.error('Error dynamically fetching commute data:', error);
        res.status(500).json({ success: false, message: 'Failed to find commute info' });
    }
};

export const getCollegeCutoffs = async (req, res) => {
    try {
        const { name } = req.params;
        const { round, category, quota } = req.query;

        if (!round) {
            return res.status(400).json({ success: false, message: 'Round is required' });
        }

        const roundLower = round.toLowerCase();
        let Model;
        if (roundLower.includes('josaa')) Model = JosaaCutoff;
        else if (roundLower.includes('csab')) Model = CsabCutoff;
        else if (roundLower.includes('ccmt')) Model = CcmtCutoff;
        else if (roundLower.includes('wbjee')) Model = WbjeeCutoff;
        else {
            return res.json({ success: true, data: [] });
        }

        // Build query
        const query = {};

        // Name matching: use tokens since exact matches might fail
        const getTokens = (str) => {
            return (str || '').toLowerCase()
                .replace(/[^a-z0-9\s]/g, ' ')
                .split(/\s+/)
                .filter(word => word.length > 2 && !['and', 'of', 'for', 'the', 'institute', 'technology', 'engineering', 'college', 'university'].includes(word));
        };
        const searchTokens = getTokens(name);
        const searchNameClean = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '');

        const cleanName = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        query.institute = { $regex: new RegExp(cleanName, 'i') };

        // Round match
        query.round = { $regex: new RegExp('^' + round.trim() + '$', 'i') };

        // Category match
        if (category && category !== 'All') {
            const mappedCategory = category === 'General' ? 'OPEN' : category;
            if (Model === CcmtCutoff) {
                query.category = { $regex: new RegExp(mappedCategory, 'i') };
            } else {
                query.seatType = { $regex: new RegExp(mappedCategory, 'i') };
            }
        }

        // Quota match
        if (quota && quota !== 'All') {
            if (Model !== CcmtCutoff) {
                query.quota = quota;
            }
        }

        let results = await Model.find(query).limit(200).lean();

        // Fallback matching logic in case exact regex misses (very common due to naming differences)
        if (results.length === 0) {
            const fallbackQuery = { round: { $regex: new RegExp('^' + round.trim() + '$', 'i') } };
            // Category match in fallback
            if (category && category !== 'All') {
                const mappedCategory = category === 'General' ? 'OPEN' : category;
                if (Model === CcmtCutoff) {
                    fallbackQuery.category = { $regex: new RegExp(mappedCategory, 'i') };
                } else {
                    fallbackQuery.seatType = { $regex: new RegExp(mappedCategory, 'i') };
                }
            }
            if (quota && quota !== 'All' && Model !== CcmtCutoff) {
                fallbackQuery.quota = quota;
            }
            
            const allRoundResults = await Model.find(fallbackQuery).lean();
            results = allRoundResults.filter(doc => {
                 const docNameClean = (doc.institute || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                 if (docNameClean && searchNameClean && (docNameClean.includes(searchNameClean) || searchNameClean.includes(docNameClean))) {
                     return true;
                 }
                 
                 const docTokens = getTokens(doc.institute);
                 const matchCount = searchTokens.filter(t => docTokens.includes(t)).length;
                 const requiredMatches = Math.min(2, Math.min(searchTokens.length, docTokens.length));
                 
                 return matchCount >= requiredMatches && matchCount > 0;
            });
        }

        let finalResults = results;

        // format to unified output
        const formattedResults = finalResults.map(item => ({
            course: item.program || 'N/A',
            quota: item.quota || item.group || 'N/A',
            category: item.seatType || item.category || 'N/A',
            gender: item.gender || 'N/A',
            openingRank: item.openingRank || item.maxGateScore || 'N/A',
            closingRank: item.closingRank || item.minGateScore || 'N/A'
        }));

        res.json({ success: true, data: formattedResults });

    } catch (error) {
        console.error('Error inside getCollegeCutoffs:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
