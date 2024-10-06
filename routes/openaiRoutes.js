import express from 'express';
import { summaryController } from '../controllers/openaiController.js';


const openaiRouter = express.Router();

 openaiRouter.post('/summary',summaryController);

export default openaiRouter;