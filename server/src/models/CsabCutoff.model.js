import mongoose from 'mongoose';

const csabCutoffSchema = new mongoose.Schema({
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

const CsabCutoff = mongoose.models.CsabCutoff || mongoose.model('CsabCutoff', csabCutoffSchema);
export default CsabCutoff;
