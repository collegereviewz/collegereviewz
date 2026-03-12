import { Job } from "../models/Job.model.js";
import { JobApplication } from "../models/JobApplication.model.js";

// Get all active jobs (For frontend Careers page)
export const getActiveJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching jobs", error: error.message });
    }
};

// Create a new job listing (For initial seeder/admin)
export const createJob = async (req, res) => {
    try {
        const newJob = new Job(req.body);
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(500).json({ message: "Error creating job", error: error.message });
    }
};

// Submit a job application (from frontend)
export const submitApplication = async (req, res) => {
    try {
        const { jobId, applicantName, email, phone, coverLetter } = req.body;
        
        // In a real app we would upload the req.file to S3 here. 
        // For simplicity, we assume we store the file locally or use base64.
        const resumeUrl = req.file ? `/uploads/resumes/${req.file.filename}` : "No resume provided";

        const newApplication = new JobApplication({
            jobId,
            applicantName,
            email,
            phone,
            resumeUrl,
            coverLetter
        });

        const savedApplication = await newApplication.save();
        res.status(201).json({ message: "Application submitted successfully", application: savedApplication });

    } catch (error) {
        res.status(500).json({ message: "Error submitting application", error: error.message });
    }
};

// Get all applications (For Admin panel)
export const getAllApplications = async (req, res) => {
    try {
        const applications = await JobApplication.find().populate('jobId', 'title department').sort({ createdAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching applications", error: error.message });
    }
};

// Update an application status (For Admin panel)
export const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = ["Pending", "Interested", "Uninterested", "Interview Scheduled", "Hired", "Rejected"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const application = await JobApplication.findByIdAndUpdate(id, { status }, { new: true });
        
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.status(200).json({ message: "Status updated", application });
    } catch (error) {
        res.status(500).json({ message: "Error updating status", error: error.message });
    }
};
