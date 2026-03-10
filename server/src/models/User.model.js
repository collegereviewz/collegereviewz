import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    openToAbroad: {
        type: Boolean,
        default: false
    },
    currentClass: {
        type: String,
        default: ''
    },
    annualBudget: {
        type: String,
        default: ''
    },
    canAffordCoaching: {
        type: Boolean,
        default: false
    },
    educationalLoanComfort: {
        type: String,
        enum: ['No', 'Maybe', 'Yes', 'Low', 'Medium', 'High', ''],
        default: ''
    },
    stream: {
        type: String,
        enum: ['Science', 'Arts', 'Commerce', 'Other', ''],
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: 18
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: ''
    },
    studentId: {
        type: String,
        unique: true,
        sparse: true
    },
    userStatus: {
        type: String,
        default: 'Active'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isTopReviewer: {
        type: Boolean,
        default: false
    },
    totalEarnings: {
        type: Number,
        default: 0
    },
    pendingEarnings: {
        type: Number,
        default: 0
    },
    approvalRate: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
