import mongoose from "mongoose";
const userModel=new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    type:String,
    phoneNo:String,

    
})

export const User=mongoose.model("user",userModel);