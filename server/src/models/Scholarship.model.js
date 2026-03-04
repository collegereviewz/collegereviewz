import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        default: 'Kolkata'
    },
    startYear: {
        type: String,
        enum: ['2026', '2027', 'Later'],
        default: '2026'
    },
    countries: [{
        type: String
    }],
    levelOfStudy: {
        type: String,
        default: 'Bachelors (Graduation)'
    },
    course: {
        type: String,
        default: ''
    },
    specialization: {
        type: String,
        default: ''
    },
    class10Year: {
        type: String,
        default: ''
    },
    class10Percent: {
        type: Number,
        default: 0
    },
    studyAbroadExam: {
        type: String,
        enum: ['Yes', 'No', 'Booked'],
        default: 'No'
    },
    consent: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);
export default Scholarship;
