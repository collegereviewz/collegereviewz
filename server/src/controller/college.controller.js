import College from '../models/College.model.js';
import Review from '../models/Review.model.js';

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
        const { triggerScrape = 'false' } = req.query;

        const escapedName = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        const college = await College.findOne({
            $or: [
                { name: { $regex: new RegExp(`^${escapedName}$`, 'i') } },
                { name: { $regex: new RegExp(name.split(' - ')[0], 'i') } }
            ]
        });
        if (!college) {
            return res.status(404).json({ success: false, message: 'College not found' });
        }

        // If reviewStats is missing or user requested a fresh scrape, trigger Gemini
        if (triggerScrape === 'true' || !college.reviewStats || !college.reviewStats.external || !college.reviewStats.external.google.rating) {
            try {
                const { extractCollegeInfo } = await import('../services/gemini.service.js');
                const aiData = await extractCollegeInfo(college.name);
                if (aiData && aiData.reviewStats) {
                    college.reviewStats = aiData.reviewStats;
                    if (aiData.fees) college.fees = aiData.fees;
                    if (aiData.courses) college.courses = aiData.courses;
                    if (aiData.avgPackage) college.avgPackage = aiData.avgPackage;
                    if (aiData.highestPackage) college.highestPackage = aiData.highestPackage;
                    await college.save();
                }
            } catch (aiErr) {
                console.error('Failed to trigger AI scrape:', aiErr.message);
            }
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
                rating: stats.length > 0 ? stats[0].averageRating : 0,
                reviewsCount: stats.length > 0 ? stats[0].totalReviews : 0,
                reviewStats: college.reviewStats
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
