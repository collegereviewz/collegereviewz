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

        // Filter by course
        if (course && course !== 'All' && course !== 'AICTE Approved') {
            if (course === 'BE/B.Tech') {
                query.course = { $regex: /Engineering|B.E.|B.Tech/i };
            } else if (course === 'MBBS' || course === 'B.Sc (Nursing)') {
                query.course = { $regex: /Medicine|Nursing|MBBS/i };
            } else {
                query.course = { $regex: course, $options: 'i' };
            }
        }

        // Filter by specific program/stream drop-down
        if (stream && stream !== 'All' && stream !== '--All--') {
            query.programme = { $regex: stream, $options: 'i' };
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

        // Find all records that exactly match this college's name
        // This queries the database, which has already been seeded with both aicteall.csv and medicalcolleges.csv
        const courses = await College.find({ name: { $regex: new RegExp(`^${name}$`, 'i') } })
            .select('course levelOfCourse intake programme courseType -_id')
            .lean();

        if (!courses || courses.length === 0) {
            return res.status(404).json({ success: false, message: 'No courses found for this college' });
        }

        res.json({
            success: true,
            data: courses
        });
    } catch (error) {
        console.error('Error fetching college courses:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
