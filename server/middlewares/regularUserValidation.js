import RegularUserModel from '../models/regularUserModel.js';
import QuestionModel from '../models/questionModel.js';
import mongoose from 'mongoose';

// Middleware to validate if the user exists in the database and is the one who asked the question
const validateRegularUser = async (req, res, next) => {
  const { email } = req.body;
  const { questionId } = req.params;

  try {
    const question = await QuestionModel.findById({_id: new mongoose.Types.ObjectId(questionId)})
    const user = await RegularUserModel.findOne({ email });

    if (!question) {
      return res.status(404).json({ message: 'QuestionModel not found' });
    }

    // Check if the user who is submitting the answer is the one who asked the question
    if (!user || question.email_asked_by !== email) {
      return res.status(403).json({ message: 'You are not authorized to answer this question' });
    }

    // Attach the user details to the request object for further use
    req.user = user;
    next();
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default validateRegularUser;