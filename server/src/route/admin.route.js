import express from 'express';
import { getAllUsers, changePassword } from '../controller/admin.controller.js';
import { verifyAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/users', verifyAdmin, getAllUsers);
router.post('/change-password', verifyAdmin, changePassword);

export default router;
