import mongoose from 'mongoose';

const wbjeeCutoffSchema = new mongoose.Schema({
    institute: { type: String, required: true, index: true },
    program: { type: String, required: true },
    stream: { type: String },
    seatType: { type: String },
    quota: { type: String },
    category: { type: String },
    openingRank: { type: String },
    closingRank: { type: String },
    round: { type: String, required: true, index: true },
    year: { type: String, default: '2025' }
}, { timestamps: true });

const WbjeeCutoff = mongoose.models.WbjeeCutoff || mongoose.model('WbjeeCutoff', wbjeeCutoffSchema);
export default WbjeeCutoff;
