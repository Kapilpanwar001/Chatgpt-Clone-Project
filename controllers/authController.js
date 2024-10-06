import errorHandler from "../middelwares/errorMiddleware.js";
import userSchema from "../models/userModel.js";
import errorResponse from "../utils/errorResponse.js";

//JWT TOKEN
export const sendToken =(user,statusCode,res)=>{
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success: true,
        token,
    });
};

//REGISTER
export const registerController = async (req, res,next) => {
    try{
        const {username, email, password} = req.body
        const exisitingEmail = await userModel.findOne({email})
        if(exisitingEmail){
            return next(new errorResponse('Email is registered',500))
             
        }
        const user = await userModel.create({username,email,password})
        this.sendToken(user,201,res)
    } catch(error){
         console.log(error)
         next(error)
    }
};

export const loginController = async (req, res,next) => {
    try{
        const {email, password}= req.body
        if(!email || !password){
            return next(new errorResponse('Please provide email and password'))
        }
        const user = await userModel.findOne({email})
        if(!user){
            return next(new errorResponse('Invalid credential',401))
        }
        const isMatch = await user.matchPassword(password)
        if(!isMatch){
            return next(new errorHandler('Invalid credential',401))
        }
        this.sendToken(user,200,res);
    }catch(error){
        console.log(error);
        next(error)
    }
};

export const logoutController = async (req, res,next ) => {
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        message : "Logout succesfully"
    });
};

