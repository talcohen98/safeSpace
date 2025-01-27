import mongoose from 'mongoose';

const answerSchema = mongoose.Schema({
  text: { 
    type: String, 
    required: true 
  },
  questionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Question', 
    required: true 
  },

  // fields for the regular user
  name: { 
    type: String,
  },
  email: { 
    type: String,
  },

  // fields for the expert
  expertName: { 
    type: String,
  },
  expertID: { 
    type: String,
  },
  expertEmail: { 
    type: String,
  },
//   expertRole: { type: String, required: true },
}, { timestamps: true });

const Answer =  mongoose.model('Answer', answerSchema);
export default Answer;
