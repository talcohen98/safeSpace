import express from 'express';
import {
    getAllQuestions,
    // getQuestionsByCategory,
    getQuestionByCategoryAndId,
    createQuestion } from '../controllers/questionsController.js';
import { sendEmailConfirmation, sendNewQuestionNotification} from '../services/emailService.js';
import requireAuth from "../middlewares/requireAuth.js";
import ExpertModel from '../models/expertModel.js';

const router = express.Router();

/**
 * Read Only Permission Routes
 */
// GET all questions
router.get('/', getAllQuestions);

// GET all questions from a certain category
// router.get('/getCategoryQuestions/:category',  getQuestionsByCategory);

// GET a single questions from a category
router.get('/getCategoryQuestions/:category/:id', getQuestionByCategoryAndId)


/**
 * Read and Write Permission Routes
 */
router.use(requireAuth)

// POST a new question
router.post('/addQuestion', async (req, res) => {
    const result = await createQuestion(req, res); // create question in DB

    if (!result.success) {
      return res.status(500).json({ message: result.error.message }); 
  }

    const { email_asked_by } = req.body; //send email to the user who asked the question

    if (email_asked_by) {
      sendEmailConfirmation(email_asked_by);
    } else {
      console.log("No email found");
    }

    const expertsInThisCategory = await ExpertModel.find({expertField: req.body.category});
    
    expertsInThisCategory.forEach(expert => {
      sendNewQuestionNotification(
        expert.email,
        req.body.question_header,
        `http://localhost:3000/${req.body.category}/${result.savedQuestion._id}`);
    });

    res.status(201).json({
      message: 'Question created and notifications sent successfully!',
      question: result.savedQuestion
    });

  });
  

export default router;