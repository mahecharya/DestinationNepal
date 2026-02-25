import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// 🔹 Base URL for backend
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/blogs/find/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!blog) return <div className="text-center mt-10">Blog not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {blog.image && (
        <img
          src={`${BASE_URL}/uploads/${blog.image}`}
          alt={blog.title}
          className="w-full max-h-60xl object-cover rounded-lg mb-4"
        />
      )}

      <div className="flex flex-wrap text-sm text-gray-600 mb-2">
        <span className="mr-4">District: {blog.district}</span>
        <span>State: {blog.state}</span>
      </div>

      {blog.category && (
        <p className="text-sm text-green-600 font-semibold mb-2">{blog.category}</p>
      )}

      <p className="text-gray-700 mb-4">{blog.description}</p>

      <p className="text-xs text-gray-400 mt-4">
        By {blog.author?.name || "Unknown"} ({blog.author?.email || ""})
      </p>
    </div>
  );
};

export default BlogDetail;