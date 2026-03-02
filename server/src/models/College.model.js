import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
    state: { type: String, required: true },
    aicteId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String },
    district: { type: String },
    institutionType: { type: String },
    programme: { type: String },
    university: { type: String },
    levelOfCourse: { type: String },
    course: { type: String },
    courseType: { type: String },
    intake: { type: Number },
    officialWebsite: { type: String },
    fees: { type: String },
    avgPackage: { type: String },
    highestPackage: { type: String },
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
    }
}, {
    timestamps: true
});

const College = mongoose.model('College', collegeSchema);

export default College;
