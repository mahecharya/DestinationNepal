import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 🔹 Base URL for backend
const BASE_URL = import.meta.env.VITE_BACKEND_URL ||  "http://localhost:5001";

const ResetPasswordDesign = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const nav = useNavigate();

  // ✅ Step 1: Send OTP
  const handlesendOTP = async () => {
    try {
      if (!email) {
        alert("Please enter your email");
        return;
      }

      const response = await axios.post(`${BASE_URL}/api/otp`, { email });
      console.log(response.data);
      alert("OTP sent successfully!");
      setStep(2);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // ✅ Step 2: Reset Password
  const handleResetPassword = async () => {
    try {
      if (!otp || !newPassword) {
        alert("Please fill all fields");
        return;
      }

      const response = await axios.post(`${BASE_URL}/api/reset-password`, {
        email,
        otp,
        newPassword,
      });

      console.log(response.data);
      alert("Password reset successful!");

      // Navigate based on login status
      if (!user) nav("/login");
      else nav("/profile");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Reset Password
        </h2>

        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handlesendOTP}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <label className="block text-gray-700 font-medium">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleResetPassword}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Reset Password
            </button>

            <p
              onClick={() => setStep(1)}
              className="text-sm text-blue-500 text-center mt-2 cursor-pointer hover:underline"
            >
              Back to Email
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordDesign;