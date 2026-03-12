import mongoose from 'mongoose';

const ccmtCutoffSchema = new mongoose.Schema({
    institute: { type: String, required: true, index: true },
    program: { type: String, required: true },
    group: { type: String },
    category: { type: String },
    maxGateScore: { type: String },
    minGateScore: { type: String },
    round: { type: String, required: true, index: true },
    year: { type: String, default: '2025' }
}, { timestamps: true });

const CcmtCutoff = mongoose.models.CcmtCutoff || mongoose.model('CcmtCutoff', ccmtCutoffSchema);
export default CcmtCutoff;
