import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpPageDesign = () => {
  const [step, setStep] = useState(1); // Step 1: send OTP, Step 2: validate OTP
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const nav=useNavigate()

const handlesendOTP = async () => {
    try {
      if (!email) {
        alert("Please enter your email");
        return;
      }

      const response = await axios.post(
        "http://localhost:5001/api/otp",
        { email }
      );

      console.log(response.data);
      alert("OTP sent successfully!");
      setStep(2);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };
  const handleVerifyOTP = async () => {
    try {
      if (!email || !otp) {
        alert("Please fill all fields");
        return;
      }

      const response = await axios.post(
        "http://localhost:5001/api/verify-otp",
        { email, otp }
      );

      console.log(response.data);
      alert("OTP Verified Successfully!");
      nav("/")
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          OTP Verification
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
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={handlesendOTP}
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">

            <label className="block text-gray-700 font-medium">Email</label>
    <input
      type="email"
      value={email}
      readOnly
      className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 cursor-not-allowed"
    />
            <label className="block text-gray-700 font-medium">Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
            onClick={handleVerifyOTP}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Validate OTP
            </button>
            <p
              className="text-sm text-blue-500 text-center mt-2 cursor-pointer hover:underline"
              onClick={() => setStep(1)}
            >
              Change Email
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtpPageDesign;