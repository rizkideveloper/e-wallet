import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

export const protectedMiddleware = asyncHandler(async(req,res,next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //request custom
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized token fail");
            
        }
    }else{
        res.status(401);
        throw new Error("Not authorized, No token");
    }

})