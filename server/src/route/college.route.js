import express from 'express';
import { getColleges, getCollegeCourses, getCollegeStats } from '../controller/college.controller.js';
import { getCollegeUpdates } from '../controller/update.controller.js';

const router = express.Router();

router.get('/', getColleges);
router.get('/:name/courses', getCollegeCourses);
router.get('/:name/stats', getCollegeStats);
router.get('/:id/updates', getCollegeUpdates);

export default router;
