import jwt from 'jsonwebtoken'
import RegularUser from '../models/regularUserModel.js'
import Expert from '../models/expertModel.js'

const requireAuth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.JWT_SECRET)
        console.log("id ", _id);

        req.user = await Promise.any([
            RegularUser.findOne({ _id }).select('_id'),
            Expert.findOne({ _id }).select('_id')
        ])
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

export default requireAuth