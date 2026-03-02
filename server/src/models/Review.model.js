import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        default: "Anonymous Student"
    },
    role: {
        type: String,
        default: "Student"
    },
    content: {
        type: String,
        required: function () { return this.type === 'text'; }
    },
    type: {
        type: String,
        enum: ['text', 'voice', 'video', 'gif'],
        default: 'text'
    },
    mediaUrl: {
        type: String
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    upvotedBy: [{
        type: String
    }],
    downvotedBy: [{
        type: String
    }],
    comments: [{
        author: String,
        content: String,
        type: {
            type: String,
            enum: ['text', 'voice', 'video'],
            default: 'text'
        },
        mediaUrl: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    hashtags: [{
        type: String
    }],
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    },
    collegeName: {
        type: String
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 5
    }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
