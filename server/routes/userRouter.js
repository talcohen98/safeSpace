import express from "express";

// controller functions
import { loginUser, signupUser, signupExpert } from '../controllers/userController.js'

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', (req, res, next) => {
    const { userType } = req.body

    if (userType === 'regular') {
        // Redirect to the regular user signup function
        return signupUser(req, res, next);
    } else if (userType === 'expert') {
        // Redirect to the expert signup function
        return signupExpert(req, res, next);
    } else {
        // Handle invalid or missing userType
        return res.status(400).json({ error: 'Invalid or missing userType. Must be "regular" or "expert".' });
    }
})

export default router