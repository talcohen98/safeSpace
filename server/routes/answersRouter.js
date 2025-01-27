import express from 'express';
import validateExpert from '../middlewares/expertValidation.js';
import validateRegularUser from '../middlewares/regularUserValidation.js';
import requireAuth from '../middlewares/requireAuth.js'

import {
    addAnswerExpert,
    addAnswerRegularUser, 
    getAnswers
} from '../controllers/answersController.js';

const router = express.Router();

// GET all answers for a specific question
router.get('/:questionId', getAnswers);

// Only logged-in users can view
router.use(requireAuth);

// POST an answer to a specific question from an expert
router.post('/expert/:questionId', validateExpert, addAnswerExpert);

// POST an answer to a specific question from a regular user
router.post('/regularUser/:questionId', validateRegularUser, addAnswerRegularUser);


export default router;