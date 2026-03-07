import Review from '../models/Review.model.js';

export const createReview = async (req, res) => {
    try {
        const { author, role, content, type, mediaUrl, hashtags, userId, collegeId, collegeName, rating } = req.body;
        const review = new Review({
            user: userId || null,
            author,
            role,
            content,
            type,
            mediaUrl,
            hashtags,
            collegeId,
            collegeName,
            rating: rating || 0
        });
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserReviews = async (req, res) => {
    try {
        const { userId } = req.params;
        const reviews = await Review.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const { page = 1, limit = 10, collegeId } = req.query;
        const filter = {};
        if (collegeId && collegeId !== 'undefined') {
            filter.collegeId = collegeId;
        }

        const skip = (page - 1) * limit;
        const total = await Review.countDocuments(filter);
        const reviews = await Review.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

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
        const review = await Review.findByIdAndUpdate(id, { $inc: { upvotes: 1 } }, { new: true });
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateDownvote = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndUpdate(id, { $inc: { downvotes: 1 } }, { new: true });
        res.status(200).json(review);
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
        review.comments = review.comments.filter(c => c._id.toString() !== commentId);
        await review.save();
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
