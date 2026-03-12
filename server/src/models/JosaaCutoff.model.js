import mongoose from 'mongoose';

const josaaCutoffSchema = new mongoose.Schema({
    institute: { type: String, required: true, index: true },
    program: { type: String, required: true },
    quota: { type: String },
    seatType: { type: String },
    gender: { type: String },
    openingRank: { type: String },
    closingRank: { type: String },
    round: { type: String, required: true, index: true },
    year: { type: String, default: '2025' }
}, { timestamps: true });

const JosaaCutoff = mongoose.models.JosaaCutoff || mongoose.model('JosaaCutoff', josaaCutoffSchema);
export default JosaaCutoff;
