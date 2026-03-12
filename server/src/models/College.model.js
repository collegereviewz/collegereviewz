import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
    state: { type: String, required: true },
    aicteId: { type: String, unique: true, sparse: true },
    aisheId: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    popularName: { type: String },
    address: { type: String },
    district: { type: String },
    institutionType: { type: String },
    university: { type: String },
    officialWebsite: { type: String },
    fees: { type: String },
    establishedYear: { type: String },
    managementType: { type: String },
    universityAisheCode: { type: String },
    courses: [{
        programme: String,
        levelOfCourse: String,
        course: String,
        courseType: String,
        intake: Number,
        fees: String
    }],
    avgPackage: { type: String },
    highestPackage: { type: String },
    about: { type: String },
    cutOffs: { type: String },
    admissionProcess: { type: String },
    ranking: { type: String },
    topRecruiters: [{ type: String }],
    resultInfo: { type: String },
    mapLink: { type: String },
    photos: [{ type: String }],
    videos: [{ type: String }],
    scholarships: { type: String },
    faq: [{
        question: String,
        answer: String
    }],
    facilities: [{ type: String }],
    studentLife: { type: String },
    contactDetails: {
        phone: String,
        email: String
    },
    commuteIntelligence: [{
        type: { type: String }, // 'airport', 'railway', 'bus'
        hubName: { type: String },
        travelTime: { type: String }
    }],
    updates: {
        notifications: [{
            title: String,
            date: String,
            link: String
        }],
        news: [{
            title: String,
            date: String,
            link: String
        }],
        events: [{
            title: String,
            date: String,
            link: String
        }],
        lastUpdated: Date
    },
    reviewStats: {
        external: {
            google: { rating: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
            shiksha: { rating: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
            collegedunia: { rating: { type: Number, default: 0 }, count: { type: Number, default: 0 } }
        },
        pros: [String],
        cons: [String],
        topReviews: [{
            author: String,
            content: String,
            rating: Number,
            source: String,
            date: String
        }]
    }
}, {
    timestamps: true
});

const College = mongoose.model('College', collegeSchema);

export default College;
