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
    }]
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
