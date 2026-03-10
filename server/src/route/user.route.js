import express from 'express';
import { updateProfile, getUserActivity, getUserProfile } from '../controller/user.controller.js';

const router = express.Router();

// Define routes for user profile
router.put('/profile/:id', updateProfile);
router.get('/profile/:id', getUserProfile);
router.get('/activity/:id', getUserActivity);

export default router;
