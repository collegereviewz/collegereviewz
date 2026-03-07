import College from '../models/College.model.js';
import Review from '../models/Review.model.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const getColleges = async (req, res) => {
    try {
        const { page = 1, limit = 5, search = '', state = 'All', course = 'All', stream = 'All' } = req.query;

        const query = {};

        // Search by name or location
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { district: { $regex: search, $options: 'i' } },
                { state: { $regex: search, $options: 'i' } }
            ];
        }

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

        // Use aggregation to get review stats
        const pipeline = [
            { $match: query },
            { $skip: skip },
            { $limit: parseInt(limit) },
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

        const colleges = await College.aggregate(pipeline);
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

        const college = await College.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (!college) {
            return res.status(404).json({ success: false, message: 'College not found' });
        }

        const pipeline = [
            { $match: { collegeId: college._id } },
            {
                $group: {
                    _id: '$collegeId',
                    averageRating: { $avg: '$rating' },
                    totalReviews: { $sum: 1 }
                }
            }
        ];

        const stats = await Review.aggregate(pipeline);

        res.json({
            success: true,
            data: {
                rating: stats.length > 0 ? stats[0].averageRating : 0,
                reviewsCount: stats.length > 0 ? stats[0].totalReviews : 0
            }
        });
    } catch (error) {
        console.error('Error fetching college stats:', error);
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
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

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
