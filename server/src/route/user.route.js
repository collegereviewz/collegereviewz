import express from 'express';
import { updateProfile } from '../controller/user.controller.js';

const router = express.Router();

// Define a route to update user profile. 
// In a fully authenticated system, we would have a middleware `verifyToken` here.
router.put('/profile/:id', updateProfile);

export default router;
