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
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchBlogs();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [category, search, page]);

  // ✅ Fetch Blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://destinationnepall.onrender.com/blogs/find",
        {
          params: {
            category: category || undefined,
            search: search || undefined,
            page,
            limit: 5,
          },
        }
      );

      setBlogs(res.data.blogs);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://destinationnepall.onrender.com/categories/all"
      );
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // ✅ Like Blog
  const handleLike = async (e, blogId) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to like this blog");
      return;
    }

    try {
      await axios.put(
        `https://destinationnepall.onrender.com/blogs/${blogId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBlogs();
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  // ✅ Rate Blog
  const handleRating = async (blogId, value) => {
    if (!user) {
      alert("Please login to rate this blog");
      return;
    }

    try {
      await axios.put(
        `https://destinationnepall.onrender.com/blogs/${blogId}/rate`,
        { value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBlogs();
    } catch (error) {
      console.error("Error rating blog:", error);
    }
  };

  // ✅ Delete Blog
  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(
        `https://destinationnepall.onrender.com/blogs/delete/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    <div className="min-h-screen bg-gray-50 p-8 pb-1">

      {/* 🔍 Search */}
      <div className="text-center mb-6">
        <input
          type="text"
          className="rounded-xl bg-slate-600 text-white p-2 w-96"
          placeholder="Search Blogs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ➕ Add Blog */}
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

      {/* 📂 Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded-full ${
            category === ""
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => setCategory("")}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            className={`px-4 py-2 rounded-full ${
              category === cat.name
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 📝 Blog Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {blogs.map((blog) => {
          const isLiked = blog.likes?.includes(user?._id);

          return (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <NavLink to={`/blogs/${blog._id}`}>
                <img
                  src={`https://destinationnepall.onrender.com/uploads/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">
                  <span className="text-sm text-green-600 font-semibold">
                    {blog.category}
                  </span>

                  <h2 className="text-lg font-bold mt-2">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-gray-600">
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

              {/* ❤️ Like + ⭐ Rating */}
              <div className="flex flex-col p-5">

                {/* Like */}
                <div className="flex items-center justify-between">
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

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="cursor-pointer text-yellow-500 text-xl"
                      onClick={() => handleRating(blog._id, star)}
                    >
                      ★
                    </span>
                  ))}

                  <span className="text-sm text-gray-600 ml-2">
                    {blog.averageRating
                      ? Number(blog.averageRating).toFixed(1)
                      : 0}{" "}
                    ⭐
                  </span>
                </div>

                {/* Admin Buttons */}
                {user?.role === "admin" && (
                  <div className="flex gap-2 mt-4">
                    <NavLink
                      to={`/createblogs/${blog._id}`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm"
                    >
                      Edit
                    </NavLink>

                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
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

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Viewblog;