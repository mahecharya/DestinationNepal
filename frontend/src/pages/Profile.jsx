import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 🔹 Base URL for backend
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const nav = useNavigate();

  const [file, setFile] = useState(null);

  const handlePhotoChange = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select a file first");

    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      const res = await axios.put(`${BASE_URL}/api/profp`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Update user in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      window.location.reload();
    } catch (error) {
      console.error("Profile update error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update profile photo");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Edit Profile Picture
      </h2>

      <div className="flex flex-col items-center">
        <img
          src={
            user?.profilePhoto
              ? `${BASE_URL}/uploads/profile/${user.profilePhoto}`
              : "https://via.placeholder.com/120"
          }
          alt="profile"
          className="w-32 h-32 rounded-full object-cover mb-4"
        />

        <form onSubmit={handlePhotoChange} className="w-full">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md mb-2"
          >
            Change Photo
          </button>

          <button
            type="button"
            onClick={() => nav("/respassword")}
            className="w-full bg-red-600 text-white py-2 rounded-md"
          >
            Forget Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;