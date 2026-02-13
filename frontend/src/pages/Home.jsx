import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import nepal from "../assets/Nepal.png"
import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5001/blogs/find");
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
        `http://localhost:5001/blogs/${blogId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    <div className="bg-gray-100 min-h-screen">

      {/* 🔥 HERO SECTION */}
     <div
  className="relative h-[70vh] bg-cover bg-center"
  style={{
    backgroundImage: `url(${nepal})`,
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0  bg-opacity-50"></div>

  {/* Text Content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
    <h1 className="text-4xl md:text-6xl font-bold mb-4">
      Discover the Beauty of Nepal
    </h1>
    <p className="text-lg md:text-xl max-w-2xl">
      From the majestic Everest and Machapuchare to ancient temples and
      lush green valleys. explore Nepal through travel stories.
    </p>
  </div>
</div>

      {/* 🔥 BLOG SECTION */}
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-10">
          Latest Travel Blogs
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {blogs.map((blog) => {
            const isLiked = blog.likes?.includes(user?._id);

            return (
              <NavLink key={blog._id} to={`/blogs/${blog._id}`}>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
                  
                  {/* Blog Image */}
                  <img
                    src={`http://localhost:5001/uploads/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-56 object-cover"
                  />

                  {/* Content */}
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

                    {/* Like */}
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
        </div>
      </div>
    </div>
  );
};

export default Home;
