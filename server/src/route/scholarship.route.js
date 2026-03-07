import express from 'express';
import { applyForScholarship, getUserScholarships } from '../controller/scholarship.controller.js';

const router = express.Router();

router.post('/apply', applyForScholarship);
router.get('/user/:userId', getUserScholarships);

// const router = express.Router();

// Define scholarship routes here
// router.get('/', getScholarships);

export default router;
