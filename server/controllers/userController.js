import RegularUser from '../models/regularUserModel.js'
import Expert from '../models/expertModel.js'
import jwt from 'jsonwebtoken'
import { sendExpertSignUpNotification } from '../services/emailService.js'

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' })
}

// login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // validation
        if (!email || !password) {
            throw Error('All fields must be filled')
        }

        const result = await Promise.any([
            RegularUser.login(email, password).then(user => ({userType: 'regular', user})), // Try logging in as a RegularUser
            Expert.login(email, password).then(user => ({userType: 'expert', user}))       // Try logging in as an Expert
        ]);

        let name;

        if (result.userType === 'regular') {
            name = result.user.name
        } else {
            name = result.user.expertName
        }

        // create a token for the successfully logged-in user
        const token = createToken(result.user._id);

        res.status(200).json({ name, email, token, userType: result.userType})
    } catch (error) {
        if (error instanceof AggregateError) { 
            // Handle all rejections from the Promise.any() call when no promise resolves successfully
            const reasons = error.errors.map(err => err.message);

            if (reasons.includes('you are not approved by the admin yet')) {
                res.status(403).json({ error: 'You are not approved by the admin yet.' });
            }
            else if (reasons.includes('you are not approved by the admin')) {
                res.status(403).json({ error: 'You are not approved by the admin.' });
            }
            else {
                res.status(400).json({error: 'Invalid email or password'})
            }
        }
        else {
            // Handle unexpected errors
            res.status(500).json({ error: error.message});
        }
    }
}

// signup regular user
export const signupUser = async (req, res) => {
    const {name, email, password, userType} = req.body

    try {
        const regularUser = await RegularUser.signup(name, email, password)

        // create token
        const token = createToken(regularUser._id)

        res.status(200).json({ email, token, userType, name })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup expert
export const signupExpert = async (req, res) => {
    const { expertName, expertID, email, password, expertField, about, userType } = req.body;

    try {
        const expert = await Expert.signup(expertName, expertID, email, password, expertField, about);

        // create token
        const token = createToken(expert._id);

        // send a notification to the admin to approve or decline the expert
        sendExpertSignUpNotification();

        res.status(200).json({ email, token, userType, name : expertName });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default {
    loginUser,
    signupUser,
    signupExpert
}