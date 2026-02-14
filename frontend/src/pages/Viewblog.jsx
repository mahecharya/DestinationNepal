import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";

const Viewblog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, [category]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const url = category
        ? `http://localhost:5001/blogs/find?category=${category}`
        : "http://localhost:5001/blogs/find";
      const res = await axios.get(url);
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5001/blogs/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleLike = async (e, blogId) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to like this blog");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5001/blogs/${blogId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      fetchBlogs();
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/blogs/delete/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Add Blog Button */}
      {user?.role === "admin" && (
        <div className="flex justify-center mb-8">
          <NavLink
            to="/createblogs"
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
          >
            <GrAdd /> ADD NEW BLOGS
          </NavLink>
        </div>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 px-4">
        <button
          className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
            category === ""
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-blue-100"
          }`}
          onClick={() => setCategory("")}
        >
          All Categories
        </button>
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
              category === cat
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-blue-100"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {blogs.map((blog) => {
          const isLiked = blog.likes?.includes(user?._id);

          return (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              {/* Blog link */}
              <NavLink to={`/blogs/${blog._id}`}>
                <img
                  src={`http://localhost:5001/uploads/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5">
                  <span className="text-sm text-green-600 font-semibold">
                    {blog.category}
                  </span>
                  <h2 className="text-lg font-bold mt-2">{blog.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {blog.district}, {blog.state}
                  </p>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                    {blog.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-3">
                    By {blog.author?.name || "Unknown"}
                  </p>
                </div>
              </NavLink>

              {/* Actions */}
              <div className="flex items-center justify-between p-5">
                <button
                  onClick={(e) => handleLike(e, blog._id)}
                  className="flex items-center gap-2 text-blue-500 hover:scale-110 transition"
                >
                  {isLiked ? <AiFillLike size={24} /> : <SlLike size={22} />}
                  <span>{blog.likes?.length || 0}</span>
                </button>

                {user?.role === "admin" && (
                  <div className="flex gap-2">
                    <NavLink
                      to={`/createblogs/${blog._id}`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm"
                    >
                      Edit
                    </NavLink>

                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Viewblog;
