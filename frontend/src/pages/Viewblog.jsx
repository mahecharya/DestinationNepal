import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";


const Viewblog = () => {
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  
  const handleLike = async (e, blogId) => {
    e.preventDefault(); // prevent NavLink redirect

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5001/blogs/${blogId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchBlogs(); 
    } catch (error) {
      console.log(error);
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
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex-1 text-center">All Blogs</h1>

        {user?.role === "admin" && (
          <NavLink
            to="/admin/createblogs"
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
          >
            <GrAdd />
            <span>ADD</span>
          </NavLink>
        )}
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {blogs.map((blog) => {
          const isLiked = blog.likes?.includes(user?._id);

          return (
            <NavLink key={blog._id} to={`/blogs/${blog._id}`}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                {/* Image */}
                <img
                  src={`http://localhost:5001/uploads/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />

                {/* Content */}
                <div className="p-4">
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

                
                  <div className="flex items-center justify-between mt-4">
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
  );
};

export default Viewblog;
