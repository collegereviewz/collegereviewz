import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicantName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resumeUrl: { type: String, required: true }, // Path to the uploaded resume
  coverLetter: { type: String },
  status: { 
    type: String, 
    enum: ["Pending", "Interested", "Uninterested", "Interview Scheduled", "Hired", "Rejected"],
    default: "Pending" 
  }
}, { timestamps: true });

export const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
