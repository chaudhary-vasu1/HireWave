import express from 'express';
import protect from "../middlewares/authMiddleware.js"
import { enhanceJobDescription, enhanceProfessionalSummary, scanResumeATS, uploadResume } from '../controllers/aiController.js';

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum' , protect , enhanceProfessionalSummary)
aiRouter.post('/enhance-job-desc' , protect , enhanceJobDescription);
aiRouter.post('/upload-resume' , protect , uploadResume);
aiRouter.post('/upload' , protect , uploadResume);
aiRouter.post('/scan-ats', protect, scanResumeATS);
export default aiRouter;