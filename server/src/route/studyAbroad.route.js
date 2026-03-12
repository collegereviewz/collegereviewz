import express from 'express';
import { getAllCountries, getCountryById } from '../controller/studyAbroad.controller.js';

const router = express.Router();

router.get('/', getAllCountries);
router.get('/:id', getCountryById);

export default router;
