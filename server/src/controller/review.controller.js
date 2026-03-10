import Review from '../models/Review.model.js';
import { uploadToR2 } from '../services/r2.service.js';

export const createReview = async (req, res) => {
    try {
        const { author, role, content, type, mediaUrl, hashtags, userId, collegeId, collegeName, rating } = req.body;

        // Upload to R2 if mediaUrl is base64
        let finalMediaUrl = mediaUrl;
        if (mediaUrl && mediaUrl.startsWith('data:')) {
            const folder = type === 'video' ? 'reviews/video' : 'reviews/audio';
            finalMediaUrl = await uploadToR2(mediaUrl, folder);
        }

        const review = new Review({
            user: userId || null,
            author,
            role,
            content,
            type,
            mediaUrl: finalMediaUrl,
            hashtags,
            collegeId,
            collegeName,
            rating: rating || 0
        });
        const savedReview = await review.save();

        // Update user stats
        if (userId) {
            await updateUserReviewStats(userId);
        }

        res.status(201).json(savedReview);
    } catch (error) {
        console.error('Create Review Error:', error);
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
        const { page = 1, limit = 10, collegeId, collegeName, hashtag } = req.query;
        const filter = {};

        if (collegeId && collegeId !== 'undefined') {
            filter.collegeId = collegeId;
        } else if (collegeName) {
            // Support searching by college name if ID is missing (hardcoded colleges)
            const escapedName = collegeName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            filter.collegeName = { $regex: new RegExp(`^${escapedName}$`, 'i') };
        }

        if (hashtag) {
            filter.hashtags = { $in: [hashtag.replace(/^#/, '')] };
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

        // Upload to R2 if mediaUrl is base64
        let finalMediaUrl = mediaUrl;
        if (mediaUrl && mediaUrl.startsWith('data:')) {
            const folder = type === 'video' ? 'comments/video' : 'comments/audio';
            finalMediaUrl = await uploadToR2(mediaUrl, folder);
        }

        const review = await Review.findById(id);
        review.comments.push({ author, content, type, mediaUrl: finalMediaUrl });
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

        // Upload to R2 if mediaUrl is base64
        let finalMediaUrl = mediaUrl;
        if (mediaUrl && mediaUrl.startsWith('data:')) {
            const folder = type === 'video' ? 'reviews/video' : 'reviews/audio';
            finalMediaUrl = await uploadToR2(mediaUrl, folder);
        }

        const review = await Review.findByIdAndUpdate(
            id,
            { content, type, mediaUrl: finalMediaUrl, hashtags },
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

        // Upload to R2 if mediaUrl is base64
        let finalMediaUrl = mediaUrl;
        if (mediaUrl && mediaUrl.startsWith('data:')) {
            const folder = type === 'video' ? 'comments/video' : 'comments/audio';
            finalMediaUrl = await uploadToR2(mediaUrl, folder);
        }

        const review = await Review.findById(id);
        const comment = review.comments.id(commentId);
        if (content) comment.content = content;
        if (type) comment.type = type;
        if (mediaUrl) comment.mediaUrl = finalMediaUrl;
        await review.save();
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateReviewStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'Approved', 'Rejected'

        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ message: "Review not found" });

        review.status = status;
        await review.save();

        if (review.user) {
            await updateUserReviewStats(review.user);
        }

        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
