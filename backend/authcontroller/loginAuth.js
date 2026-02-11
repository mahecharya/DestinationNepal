import Login from "../model/loginModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwt.js";

export const createLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "please fill all details" });
    }
    const existingUser = await Login.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const login = await Login.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Accountv created successfully",
      loginID: Login._id,
    });
  } catch (error) {
    console.log(error);
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "please fill all details" });
    }
    const existingUser = await Login.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "user not found" });
    }
    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (!isMatched) {
      return res.status(400).json({ message: "password wrong" });
    }
    const token=generateToken(existingUser._id);

    console.log(token)
    res.cookie("token", token,{
      httpOnly:true,
      secure:false,
      sameSite:"strict",
      maxAge: 7*24*60*60*1000
      
    })
    res.status(200).json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      token,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser=async(req,res)=>{
  try {
      res.clearCookie("token",{
        httpOnly:true,
      secure:false,
      maxAge: 7*24*60*60*1000
      
      })
      res.status(200).json({message:"logout successfuly"})
  } catch (error) {
    console.log(error)
  }
}