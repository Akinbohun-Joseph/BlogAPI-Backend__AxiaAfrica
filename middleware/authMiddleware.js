const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
////const authMiddleware = require('../middleware/authMiddleware')
const tokengenerated = require('../config/jwtConfig')

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET
    if (!token ) {
        return res.status(401).json({ message: 'Access Denied'});
    }
    try {
        req.user._id = userId
        const verifyToken = jwt.verify(token, secret)
        const user = await userModel.findById(verifyToken.id).select('-password')
        if(!user ||!verifyToken){
            return res.json({message: 'Token Invalid'})

        }
        next();
    } catch (error) {
       console.log(error)
    return res.status(401).json({message: ' unauthorized'})
}   }


module.exports = authMiddleware