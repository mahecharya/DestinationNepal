import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Likedblogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLikedBlogs();
  }, []);

  const fetchLikedBlogs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://destinationnepal.onrender.com/blogs/liked",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogs(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading liked blogs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Liked Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t liked any blogs yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <NavLink key={blog._id} to={`/blogs/${blog._id}`}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

                <img
                  src={`https://destinationnepal.onrender.com/uploads/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-4">
                  <span className="text-sm text-green-600 font-semibold">
                    {blog.category}
                  </span>

                  <h2 className="text-lg font-bold mt-2">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-gray-600 mt-1">
                    {blog.district}, {blog.state}
                  </p>

                  <p className="text-xs text-gray-400 mt-3">
                    By {blog.author?.name || "Unknown"}
                  </p>

                  <div className="mt-4 text-blue-500 font-semibold">
                     {blog.likes.length} Likes
                  </div>
                </div>

              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Likedblogs;
