import express from 'express';
import { getColleges, getCollegeStats, getCollegeCourses } from '../controller/college.controller.js';

const router = express.Router();

router.get('/', getColleges);
router.get('/stats/:name', getCollegeStats);
router.get('/courses/:name', getCollegeCourses);

export default router;
