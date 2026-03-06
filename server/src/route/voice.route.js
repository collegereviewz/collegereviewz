import express from 'express';
import { textToSpeech, chatWithAI } from '../controller/voice.controller.js';

const router = express.Router();

router.post('/tts', textToSpeech);
router.post('/chat', chatWithAI);

export default router;
