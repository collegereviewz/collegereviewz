import express from 'express';
import { getColleges, getCollegeStats, getCollegeCourses, getCollegeCutoffs } from '../controller/college.controller.js';

const router = express.Router();

router.get('/', getColleges);
router.get('/stats/:name', getCollegeStats);
router.get('/courses/:name', getCollegeCourses);
router.get('/cutoffs/:name', getCollegeCutoffs);

export default router;
