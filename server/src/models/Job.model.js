import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true, default: "Remote" },
  type: { type: String, required: true, default: "Full-Time" },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);
