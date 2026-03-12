import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
    getActiveJobs,
    createJob,
    submitApplication,
    getAllApplications,
    updateApplicationStatus
} from '../controller/job.controller.js';

const router = express.Router();

// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), 'uploads', 'resumes');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|doc|docx/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only PDF and Word documents are allowed'));
        }
    }
});

// ==== Public Routes ====
// Get all active job listings
router.get('/', getActiveJobs);

// Submit a job application (handles single file upload named 'resume')
router.post('/apply', upload.single('resume'), submitApplication);

// ==== Admin Routes ====
// Note: In a real app, these should be protected by auth middleware. 
// Adding them here for the requested functionality.
router.post('/create', createJob);
router.get('/applications', getAllApplications);
router.patch('/applications/:id/status', updateApplicationStatus);

export default router;
