import User from '../models/User.model.js';
import College from '../models/College.model.js';
import bcryptjs from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { userId, newPassword } = req.body;

        if (!userId || !newPassword) {
            return res.status(400).json({ message: "User ID and new password are required" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error in changePassword:", error);
    }
};

export const getExams = async (req, res) => {
    try {
        const examsDataPath = path.resolve(process.cwd(), '../client/src/pages/ExploreColleges/Exams/exams_data.json');
        if (fs.existsSync(examsDataPath)) {
            const exams = JSON.parse(fs.readFileSync(examsDataPath, 'utf8'));
            res.status(200).json(exams);
        } else {
            res.status(404).json({ message: "Exams data file not found" });
        }
    } catch (error) {
        console.error("Error in getExams:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addOrUpdateExam = async (req, res) => {
    try {
        const examData = req.body;
        if (!examData.name) {
            return res.status(400).json({ message: "Exam name is required" });
        }

        const examsDataPath = path.resolve(process.cwd(), '../client/src/pages/ExploreColleges/Exams/exams_data.json');
        const examsListPath = path.resolve(process.cwd(), '../client/src/data/exams_list.json');
        
        console.log('Resolved Absolute Paths:', { examsDataPath, examsListPath });
        console.log('Exists:', { data: fs.existsSync(examsDataPath), list: fs.existsSync(examsListPath) });

        // Read existing data
        let exams = [];
        if (fs.existsSync(examsDataPath)) {
            exams = JSON.parse(fs.readFileSync(examsDataPath, 'utf8'));
        }

        const index = exams.findIndex(ex => ex.name.toLowerCase() === examData.name.toLowerCase());
        
        if (index !== -1) {
            // Update existing
            exams[index] = { ...exams[index], ...examData };
        } else {
            // Add new
            const nextId = exams.length > 0 ? exams.reduce((max, e) => Math.max(max, e.id || 0), 0) + 1 : 1;
            exams.push({ ...examData, id: nextId });
        }

        // Write to both files to keep them in sync
        const jsonContent = JSON.stringify(exams, null, 2);
        fs.writeFileSync(examsDataPath, jsonContent);
        if (fs.existsSync(examsListPath)) {
            fs.writeFileSync(examsListPath, jsonContent);
        }

        res.status(200).json({ success: true, message: "Exam data updated successfully" });
    } catch (error) {
        console.error("Error in addOrUpdateExam:", error);
        res.status(500).json({ message: "Failed to update exam data", error: error.message });
    }
};

export const deleteExam = async (req, res) => {
    try {
        const { name } = req.params;
        const examsDataPath = path.resolve(process.cwd(), '../client/src/pages/ExploreColleges/Exams/exams_data.json');
        const examsListPath = path.resolve(process.cwd(), '../client/src/data/exams_list.json');

        const deleteFromFile = (filePath) => {
            if (fs.existsSync(filePath)) {
                let exams = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                exams = exams.filter(ex => ex.name.toLowerCase() !== name.toLowerCase());
                fs.writeFileSync(filePath, JSON.stringify(exams, null, 2));
            }
        };

        deleteFromFile(examsDataPath);
        deleteFromFile(examsListPath);

        res.status(200).json({ success: true, message: "Exam deleted successfully from database" });
    } catch (error) {
        console.error("Error in deleteExam:", error);
        res.status(500).json({ message: "Failed to delete exam" });
    }
};

export const addOrUpdateCollege = async (req, res) => {
    try {
        const collegeData = req.body;
        if (!collegeData.name || !collegeData.state) {
            return res.status(400).json({ message: "College name and state are required" });
        }

        // Use name as identifier for updates if _id isn't provided
        let college;
        if (collegeData._id) {
            college = await College.findByIdAndUpdate(collegeData._id, collegeData, { new: true, upsert: true });
        } else {
            // Check if exists by name (case insensitive)
            college = await College.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${collegeData.name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}$`, 'i') } },
                collegeData,
                { new: true, upsert: true }
            );
        }

        res.status(200).json({ success: true, message: "College data updated successfully", data: college });
    } catch (error) {
        console.error("Error in addOrUpdateCollege:", error);
        res.status(500).json({ message: "Failed to update college data", error: error.message });
    }
};

export const deleteCollege = async (req, res) => {
    try {
        const { id } = req.params;
        await College.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "College deleted successfully" });
    } catch (error) {
        console.error("Error in deleteCollege:", error);
        res.status(500).json({ message: "Failed to delete college" });
    }
};
