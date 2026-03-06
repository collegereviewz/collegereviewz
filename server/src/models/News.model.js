import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true, unique: true },
    category: {
        type: String,
        required: true,
        enum: ['MBBS', 'BE/B.Tech', 'Law', 'Science', 'Commerce', 'Pharmacy', 'ME/M.Tech', 'B.Sc Nursing', 'General']
    },
    type: {
        type: String,
        required: true,
        enum: ['Exam Alerts', 'Admission Alerts', 'College Alerts']
    },
    date: { type: String },
    source: { type: String },
    isLive: { type: Boolean, default: true }
}, {
    timestamps: true
});

const News = mongoose.model('News', newsSchema);

export default News;
