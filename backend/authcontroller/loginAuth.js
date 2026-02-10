import Login from "../model/loginModel.js";
import bcrypt from "bcryptjs";

export const createLogin=async(req,res)=>{
    try {
        const {email, password}=req.body;

        if(!email||!password){
            return res.status(400).json({message:"please fill all details"});
        }
        const existingUser=await Login.findOne({email});
        if(existingUser){
            return res.status(409).json({message:"user already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,8);
        const login=await Login.create({
            ...req.body,
            password:hashedPassword,
        })
        res.status(201).json({
      message: "Accountv created successfully",
      loginID: Login._id,
    });
        
    } catch (error) {
       console.log(error) 
    }
}