import mongoose from "mongoose";

const loginSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    otp: {
      type: String,
    },
    otpExpire: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Login = mongoose.model("Login", loginSchema);

export default Login;
