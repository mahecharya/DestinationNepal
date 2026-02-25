import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const nav=useNavigate()

  const [file, setFile] = useState(null);

  const handlePhotoChange = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profilePhoto", file);

    const res = await axios.put(
      "https://destinationnepal.onrender.com/api/profp",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    localStorage.setItem("user", JSON.stringify(res.data));
    window.location.reload();
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
              ? `https://destinationnepal.onrender.com/uploads/profile/${user.profilePhoto}`
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
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Change Photo
          </button>

        


        </form>

          <button
            type="submit"
            onClick={()=>(nav("/respassword"))}
            className="w-full bg-red-600 text-white py-2 rounded-md"
          >
           Forget password
          </button>

      </div>
    </div>
  );
};

export default Profile;
