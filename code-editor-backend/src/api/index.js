import express from 'express';
import { completionController } from './completion.controller.js';

const router = express.Router();

router.post('/complete', completionController.completeCode);

export default router;
