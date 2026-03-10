import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
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
        type: String,
        required: false
    },
    collegeName: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        default: 0
    },
    upvotedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
