import QuestionModel from '../models/questionModel.js';

// Get all questions
const getAllQuestions = async (req, res) => {  
    try {
        const questions = await QuestionModel.find().sort({ createdAt: -1 });  // Fetch all questions from MongoDB
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: error.message });
    }
};


// Get all questions from a certain category
const getQuestionsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const questions = await QuestionModel.find({ category }).sort({ createdAt: -1 }); 

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
   

// Get a single questions from a category
const getQuestionByCategoryAndId = async (req, res) => {
    try {
        const { category, id } = req.params;
        const question = await QuestionModel.findOne({ _id: id, category });

        if (!question) {
          return res.status(404).json({ message: "QuestionModel not found in this category" });
        }
        res.status(200).json(question);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    } 
};


// Create a new question
const createQuestion = async (req) => {
    try {
        const { category, question_header, question_body, name_asked_by, email_asked_by } = req.body;

        const question = new QuestionModel({
            category,
            question_header,
            question_body,
            name_asked_by,
            email_asked_by,
            is_anonymous : name_asked_by === "Anonymous"
        });

        const savedQuestion = await question.save();

        // // adding the user who asked the question to the regularUser collection
        // const existingUser = await RegularUserModel.findOne({ email: email_asked_by });
        //
        // if (!existingUser) {
        //     const newUser = new RegularUserModel({
        //         name: name_asked_by,
        //         email: email_asked_by
        //     });
        //
        //     await newUser.save();
        // }

        return { success: true, savedQuestion };
    } catch (error) {
        return { success: false, error: error };
    }
};


export {
    getAllQuestions,
    getQuestionsByCategory,
    getQuestionByCategoryAndId,
    createQuestion
};