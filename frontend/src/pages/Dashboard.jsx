import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 🔹 Base URL for backend
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const Dashboard = () => {
  const navigate = useNavigate();
  const [bcount, setBcount] = useState(0);
  const [ucount, setUcount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogCount = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blogs/bcount`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setBcount(response.data.totalBlogs);
      } catch (error) {
        console.error("Error fetching blog count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogCount();
  }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/ucount`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUcount(res.data.totalusers);
      } catch (error) {
        console.error("Error fetching user count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Admin Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Total Blogs */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg text-gray-600">Total Blogs</h2>
          <p className="text-4xl font-bold text-indigo-600 mt-2">{bcount}</p>
        </div>

        {/* Total Users */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg text-gray-600">Total Users</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">{ucount}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manage Blogs */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Manage Blogs</h3>
          <button
            onClick={() => navigate("/viewblogs")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Go to Blogs
          </button>
        </div>

        {/* Manage Users */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Manage Users</h3>
          <button
            onClick={() => navigate("/users")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Go to Users
          </button>
        </div>

        {/* Manage Profile */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Manage Profile</h3>
          <button
            onClick={() => navigate("/profile")}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;