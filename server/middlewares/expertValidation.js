import ExpertModel from '../models/expertModel.js';

// Middleware to validate if the expert exists in the database and is approved by an admin
const validateExpert = async (req, res, next) => {
  // const { expertID } = req.body;
  const { email } = req.body;

  try {
    const expert = await ExpertModel.findOne({ email });
    console.log("expert email ", email);
    if (!expert || expert.approved === "false") {
      return res.status(403).json({ message: 'You are not authorized to answer questions.' });
    }
    if(expert.approved === "pending") {
      return res.status(401).json({ message: 'you have not been approved by an admin yet. Please wait for approval to start answering.' });
    }
    // Attach the expert details to the request object for further use
    req.expert = expert;
    next();
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default validateExpert;