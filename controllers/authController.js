import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import asyncHandler from "../middlewares/asyncHandler.js"

const signToken = id =>{
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn: '6d'
    })
}

// const createSendResToken = (user, statusCode, res) => {
//     const token = signToken(user._id)

//     const isDev = process.env.NODE_ENV === 'development' ? false : true

//     const cookieOption = {
//         expire : new Date(
//             Date.now() + 6 * 24 * 60 * 60 * 1000
//         ),
//         httpOnly: true,
//         security: isDev
//     }

//     res.cookie('jwt', token, cookieOption)

//     user.password = undefined

//     res.status(statusCode).json({
//         data : user,
//         token
//     })
// }

export const registerUser= asyncHandler(async (req,res) =>{
    const isAdmin = (await User.countDocuments()) === 0

    const role = isAdmin ? 'admin':'user'

    const createUser = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        role: role
    })

    return res.status(200).json({
        message: 'Account has been created',
        data: createUser
    })
})

export const loginUser = asyncHandler(async (req,res) =>{
    //buat validasi
    if (!req.body.email || !req.body.password) {
        res.status(400)
        throw new Error("email or password is required");    
    }

    //cek email ada tau tidak di db
    const userData = await User.findOne({
        email: req.body.email
    })

    //cek password
    if(userData && (await userData.comparePassword(req.body.password))){
        const token = signToken(userData._id)
        return res.status(200).json({
            message: 'Login success',
            token
        })
    }else{
        res.status(400)
        throw new Error("invalid user"); 
    }


})

export const getCurrentUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id).select("-password") //custom request

    if (user) {
        return res.status(200).json({
            user
        })
    }else{
        res.status(404)
        throw new Error("user not found");
        
    }
})

export const logoutUser = async(req,res) => {
    res.status(200).json({
        message: "Logout success"
    })
}

export const getAllUser = asyncHandler(async(req,res) => {
    const users = await User.find();

    return res.status(200).json({
      data: users
    });
})