import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import nepal from "../assets/Nepal.png";
import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";
import img from "../assets/img.jpg";
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Fetch Blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const url = category
        ? `https://destinationnepal.onrender.com/find?category=${category}`
        : "https://destinationnepal.onrender.com/blogs/find";

      const res = await axios.get(url);
      console.log(res)
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Categories from NEW URL
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://destinationnepal.onrender.com/categories/all"
      );

      // If backend returns array of objects like [{_id, name}]
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (e, blogId) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first to like this blog");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://destinationnepal.onrender.com/blogs/${blogId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${nepal})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover the Beauty of Nepal
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            From the majestic Everest and Machapuchare to ancient temples and
            lush green valleys. Explore Nepal through travel stories.
          </p>
        </div>
      </div>

      {/* ✅ Category Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mt-10 mb-8 px-4">
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

        {categories.map((cat) => (
          <button
            key={cat._id}
            className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
              category === cat.name
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-blue-100"
            }`}
            onClick={() => setCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Blogs
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {blogs.map((blog) => {
            const isLiked = blog.likes?.includes(user?._id);

            return (
              <NavLink key={blog._id} to={`/blogs/${blog._id}`}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden">
                  <img
                    src={`https://destinationnepal.onrender.com/uploads/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-5">
                    <span className="text-sm font-semibold text-green-600">
                      {blog.category}
                    </span>

                    <h2 className="text-xl font-bold mt-2">
                      {blog.title}
                    </h2>

                    <p className="text-sm text-gray-600 mt-1">
                      {blog.district}, {blog.state}
                    </p>

                    <p className="text-sm text-gray-500 mt-3 line-clamp-3">
                      {blog.description}
                    </p>

                    <p className="text-xs text-gray-400 mt-4">
                      By {blog.author?.name || "Unknown"}
                    </p>

                    <div className="flex items-center justify-between mt-5">
                      <button
                        onClick={(e) => handleLike(e, blog._id)}
                        className="flex items-center gap-2 text-blue-500 hover:scale-110 transition"
                      >
                        {isLiked ? (
                          <AiFillLike size={24} />
                        ) : (
                          <SlLike size={22} />
                        )}
                        <span>{blog.likes?.length || 0}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}

          {/* View More Card */}
          {blogs.length > 5 && (
            <NavLink to="/viewblogs">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden">
                <img
                  src={img}
                  alt="View All Blogs"
                  className="w-full h-56 opacity-50 object-cover"
                />

                <div className="p-5 flex items-center justify-center">
                  <h2 className="text-xl font-bold flex text-center">
                    <FaArrowRightLong className="pt-1" />
                    <span> View All Blogs</span>
                  </h2>
                </div>
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
