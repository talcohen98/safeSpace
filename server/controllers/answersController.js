import AnswerModel from "../models/answerModel.js";
import QuestionModel from "../models/questionModel.js";
import mongoose from "mongoose";
import { sendExpertResponseNotification, sendRegularUserResponseNotification } from "../services/emailService.js";
/**
 * Add an answer or a comment to a specific question
 * This route is restricted to verified experts only
 */
const addAnswerExpert = async (req, res) => {
  try {
    const { text } = req.body;
    const { questionId } = req.params;

    // Extract expert details from the middleware
    const { expertName, expertID, email /* , expertField*/ } = req.expert;

    // Create a new answer object
    const answer = new AnswerModel({
      text,
      questionId, // Link the answer to the question ID
      expertName,
      expertID,
      expertEmail : email,
      //expertField,
    });

    const savedAnswer = await answer.save();

    const question = await QuestionModel.findById({_id: new mongoose.Types.ObjectId(questionId)})
    question.num_replies += 1;
    await question.save();

    
    sendExpertResponseNotification(question.email_asked_by, question.question_header, `http://localhost:3000/${question.category}/${questionId}`); // notify the user that an expert has responded to their question

    res.status(201).json(savedAnswer); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

/**
 * Add a comment to a specific question
 * This route is restricted to the person who asked the question
 */
const addAnswerRegularUser = async (req, res) => {
  try {
    const { text } = req.body;
    const { questionId } = req.params;

    // Extract user details from the middleware
    const { name, email} = req.user;

    // Create a new answer object
    const answer = new AnswerModel({
      text,
      questionId, // Link the answer to the question ID
      name,
      email,
    });

    // get the last expert who answered the question if exists
    const lastExpertAnswer = await AnswerModel.find({
      questionId: questionId, 
      expertID: { $exists: true, $ne: null } // Ensure expertID exists and is not null
  }).sort({ createdAt: -1 }).limit(1);

    const savedAnswer = await answer.save();

    const question = await QuestionModel.findById({_id: new mongoose.Types.ObjectId(questionId)})
    question.num_replies += 1;
    await question.save();

    // send notification to the expert - there is a follow-up question
    if (lastExpertAnswer.length) {
      sendRegularUserResponseNotification(lastExpertAnswer[0].expertEmail, question.question_header, `http://localhost:3000/${question.category}/${questionId}`);
    }

    res.status(201).json(savedAnswer); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

/**
 * Get all answers for a specific question
 * Returns answers sorted by creation date (newest first)
 */
const getAnswers = async (req, res) => {
  try {
    const { questionId } = req.params;
    const answers = await AnswerModel.find({ questionId: questionId }).sort({ createdAt: 1 });
    // Check if no answers were found

    if (!answers.length) {
      return res.status(404).json({ message: 'No answers found for this question' });
    }

    res.status(200).json(answers); // Send the answers as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};

export {
  addAnswerExpert,
  addAnswerRegularUser,
  getAnswers,
};