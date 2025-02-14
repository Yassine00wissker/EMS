import dotenv from "dotenv";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

dotenv.config();
const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(404).json({success: false, error: "Token not Provided"})
        }

        const decoded = await jwt.verify(token, process.env.JWT_KEY)
        if(!decoded) {
            return res.status(404).json({success: false, error: "Token not valid"})
        }

        const user = await User.findById({_id: decoded._id}).select('-password')

        if(!user){
            return res.status(404).json({success: false, error: "User Not Found"})
        }
        
        req.user = user
        next()
    } catch (error) {
        return res.status(500).json({success: false, error: "sever side error"})
    }
}
export default verifyUser;