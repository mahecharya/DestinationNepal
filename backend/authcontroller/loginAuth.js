import Login from "../model/loginModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwt.js";
import transporter from "../config/Nodemailer.js";

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

    const login = await Login.create({
      name,
      age,
      gender,
      email,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "user",
    });
    res.status(201).json({
      message: "Account created successfully",
      loginID: Login._id,
      role: login.role,
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
    const token = generateToken(existingUser);

    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 5 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
      user: existingUser,
      token,
    });
  } catch (error) {
    console.log(error);
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
      totalusers,
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
      email: req.body.email,
    };

    if (req.file) {
      updateData.profilePhoto = req.file.filename;
    }

    const user = await Login.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Profile update failed" });
  }
};

export const findUsers = async (req, res) => {
  try {
    const users = await Login.find(); // fetch all users without sorting
    res.status(200).json(users); // return array directly
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await Login.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;
    await user.save();

    // Send Email
    await transporter.sendMail({
      from: process.env.SMTP_SENDER,
      to: user.email,
      subject: "Your OTP Code",
      html: `<h2>Destination Nepal OTP Verification</h2><h1>${otp}</h1><p>Expires in 5 minutes.</p>`,
    });

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ OTP Send Error:", error);
    return res.status(500).json({ message: error.message || "Something went wrong" });
  }
};
export const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await Login.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check Expiry
    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    res.status(200).json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Find user by email
    const user = await Login.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare OTP directly (no hashing)
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP has expired
    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    user.password = hashedPassword;

    // Clear OTP
    user.otp = undefined;
    user.otpExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
