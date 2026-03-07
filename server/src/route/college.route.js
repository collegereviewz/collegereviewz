import express from 'express';
import { getColleges, getCollegeCourses, getCollegeStats, getCollegeCommute, getCollegeDetails } from '../controller/college.controller.js';
import { getCollegeUpdates } from '../controller/update.controller.js';

const router = express.Router();

router.get('/', getColleges);
router.get('/:name', getCollegeDetails);
router.get('/:name/courses', getCollegeCourses);
router.get('/:name/stats', getCollegeStats);
router.get('/:id/updates', getCollegeUpdates);
router.get('/:id/commute', getCollegeCommute);

export default router;
