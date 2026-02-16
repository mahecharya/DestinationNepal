import Login from "../model/loginModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwt.js";

export const createLogin = async (req, res) => {
  try {
   const { name, age, gender, email, password, role } = req.body;

    if (!name || !age || !gender || !email || !password) {
      return res.status(400).json({ message: "please fill all details" });
    }
    const existingUser = await Login.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    
    const login=await Login.create({
       name,
      age,
      gender,
      email,
      password:hashedPassword,
      role:role==="admin"?"admin":"user",
    })
    res.status(201).json({
      message: "Account created successfully",
      loginID: Login._id,
      role:login.role
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
    const token=generateToken(existingUser);

    console.log(token)
    res.cookie("token", token,{
      httpOnly:true,
      secure:false,
      sameSite:"lax",
      maxAge: 7*24*60*60*1000
      
    })
    res.status(200).json({
      message: "Login successful",
      user: existingUser,
      token,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
  }
};
export const getUserCount = async (req, res) => {
  try {
    const totalusers = await Login.countDocuments();

    res.status(200).json({
      totalusers
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const updateData = {
      name: req.body.name,
      email: req.body.email
    };

    if (req.file) {
      updateData.profilePhoto = req.file.filename;
    }

    const user = await Login.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    res.status(200).json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Profile update failed" });
  }
};

