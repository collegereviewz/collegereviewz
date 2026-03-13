import express from 'express';
import { getAllUsers, changePassword, getExams, addOrUpdateExam, deleteExam, addOrUpdateCollege, deleteCollege } from '../controller/admin.controller.js';
import { verifyAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/users', verifyAdmin, getAllUsers);
router.post('/change-password', verifyAdmin, changePassword);

router.get('/exams', verifyAdmin, getExams);
// Exam Management
router.post('/exams', verifyAdmin, addOrUpdateExam);
router.delete('/exams/:name', verifyAdmin, deleteExam);

// College Management
router.post('/colleges', verifyAdmin, addOrUpdateCollege);
router.delete('/colleges/:id', verifyAdmin, deleteCollege);

export default router;
