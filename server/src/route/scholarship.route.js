import express from 'express';
import { applyForScholarship, getUserScholarships } from '../controller/scholarship.controller.js';

const router = express.Router();

router.post('/apply', applyForScholarship);
router.get('/user/:userId', getUserScholarships);

export default router;
