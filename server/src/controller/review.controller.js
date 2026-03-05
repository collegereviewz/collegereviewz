import Review from '../models/Review.model.js';

export const createReview = async (req, res) => {
    try {
        const { author, role, content, type, mediaUrl, hashtags, collegeId, collegeName, rating } = req.body;
        const review = new Review({ author, role, content, type, mediaUrl, hashtags, collegeId, collegeName, rating });
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const { collegeId, page = 1, limit = 10 } = req.query;
        const filter = collegeId ? { collegeId } : {};

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const reviews = await Review.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Review.countDocuments(filter);

        res.status(200).json({
            reviews,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateUpvote = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ message: "User ID required" });

        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ message: "Review not found" });

        if (review.upvotedBy.includes(userId)) {
            review.upvotedBy = review.upvotedBy.filter(uId => uId !== userId);
            review.upvotes = Math.max(0, review.upvotes - 1);
        } else {
            review.upvotedBy.push(userId);
            review.upvotes += 1;
            if (review.downvotedBy.includes(userId)) {
                review.downvotedBy = review.downvotedBy.filter(uId => uId !== userId);
                review.downvotes = Math.max(0, review.downvotes - 1);
            }
        }

        const savedReview = await review.save();
        res.status(200).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateDownvote = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ message: "User ID required" });

        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ message: "Review not found" });

        if (review.downvotedBy.includes(userId)) {
            review.downvotedBy = review.downvotedBy.filter(uId => uId !== userId);
            review.downvotes = Math.max(0, review.downvotes - 1);
        } else {
            review.downvotedBy.push(userId);
            review.downvotes += 1;
            if (review.upvotedBy.includes(userId)) {
                review.upvotedBy = review.upvotedBy.filter(uId => uId !== userId);
                review.upvotes = Math.max(0, review.upvotes - 1);
            }
        }

        const savedReview = await review.save();
        res.status(200).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { author, content, type, mediaUrl } = req.body;
        const review = await Review.findById(id);
        review.comments.push({ author, content, type, mediaUrl });
        await review.save();
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        await Review.findByIdAndDelete(id);
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, type, mediaUrl, hashtags } = req.body;
        const review = await Review.findByIdAndUpdate(
            id,
            { content, type, mediaUrl, hashtags },
            { new: true }
        );
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const deleteComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ message: "Review not found." });

        review.comments = review.comments.filter(c => c._id.toString() !== commentId);
        await review.save();
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment", error: error.message });
    }
};

export const getTrendingTags = async (req, res) => {
    try {
        // Aggregate all hashtags to find the most popular ones
        const tags = await Review.aggregate([
            { $unwind: "$hashtags" },
            { $group: { _id: { $toLower: "$hashtags" }, count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        const formattedTags = tags.map(tag => ({
            tag: `#${tag._id}`, // Keep hashtags readable
            count: `${tag.count} posts`,
            rawTag: tag._id // For filtering
        }));

        res.json(formattedTags);
    } catch (error) {
        res.status(500).json({ message: "Error fetching trending tags", error: error.message });
    }
};

export const getTopReviewers = async (req, res) => {
    try {
        // Aggregate authors by post count
        const topReviewers = await Review.aggregate([
            { $group: { _id: "$author", postCount: { $sum: 1 } } },
            { $sort: { postCount: -1 } },
            { $limit: 5 }
        ]);

        const formattedReviewers = topReviewers.map(reviewer => ({
            name: reviewer._id || 'Anonymous Student',
            points: reviewer.postCount.toString(), // Using 'points' field to mean 'posts'
            avatar: reviewer._id ? reviewer._id.substring(0, 2).toUpperCase() : 'AS'
        }));

        res.json(formattedReviewers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching top reviewers", error: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const { content, type, mediaUrl } = req.body;
        const review = await Review.findById(id);
        const comment = review.comments.id(commentId);
        if (content) comment.content = content;
        if (type) comment.type = type;
        if (mediaUrl) comment.mediaUrl = mediaUrl;
        await review.save();
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
