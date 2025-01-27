import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import staySafeQuestionsRoutes from './routes/questionsRouter.js';
import staySafeAnswersRoutes from './routes/answersRouter.js';
import userRouter from "./routes/userRouter.js";
import adminRoutes from './routes/adminRouter.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images'))); // Serve static images


// Allow requests from the client URL and the admin URL
const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      // Allow requests 
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


// logging the requests to the server
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});

app.use('/staySafe', userRouter);
app.use('/staySafe/questions', staySafeQuestionsRoutes);
app.use('/staySafe/answers', staySafeAnswersRoutes);


app.use('/admin', adminRoutes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
