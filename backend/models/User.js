import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email: {type:String,required: true},
    password: {type:String,required: true},
    role: {type:String,enum: ["Admin","Employee"],require:true},
    profileImage: {type: String},
    craeteAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})
const User = mongoose.model("User",userSchema)

export default User;