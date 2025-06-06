import express from 'express';
import { getAnswerFromQuestion } from '../controller/chatbot.js';

const router = express.Router();
router.post('/chat', getAnswerFromQuestion);

export default router;