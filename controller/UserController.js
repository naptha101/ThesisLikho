import { User } from "../models/User.js";
import bcrypt from 'bcrypt'

export const userLogin=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Email or Password"});
            }
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({message:"Invalid Email or Password"});
                }
                const token=await jwt.sign({user_id:user._id},process.env.SECRET_KEY)
res.status(200).cookie(
    "token",token,{httpOnly:true,secure:true,maxAge:3600000}).json({
    message:"Login Successfull",
    token:token
})

    }
    catch(err){
        console.log(err);

    }
}


export const userRegister=async (req,res)=>
    {
        try{
            const {name,email,password}=req.body;
            const userExist=await User.findOne({email});
            if(userExist){
                return res.status(400).json({message:"Email already exist"});
                }
                const hashedPassword=await bcrypt.hash(password,10);
                const user=new User({name,email,password:hashedPassword});
                await user.save();
                res.status(200).json({message:"User created successfully"});

        }
        catch(err){
            console.log(err);

        }
    }