// controllers/blogController.js
import Blog from "../model/blogModel.js";
import path from "path";
import fs from "fs";

export const createBlog = async (req, res) => {
  try {
    const { title, district, state,category, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newBlog = new Blog({
      title,
      district,
      state,
      description,
      category,
      image: req.file.filename,
      
      author: req.user._id,
    });
    console.log(req.user); 


    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const findBlog = async (req, res) => {
  try {
      const {category}=req.query;
      let filter={};
      if(category){
        filter.category=category;
      }

    const blogs = await Blog.find(filter)
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(blogs); // ✅ return array directly
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const findBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name email");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCategories = async (req, res) => {
  try {
    const categories = await Blog.distinct("category"); // MongoDB distinct
    res.status(200).json(categories); // returns array: ["Travel", "Food", ...]
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id; // from auth middleware

    const blog = await Blog.findById(blogId);
    

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // Like
      blog.likes.push(userId);
    }

    await blog.save();

    res.status(200).json({
      message: alreadyLiked ? "Unliked" : "Liked",
      totalLikes: blog.likes.length,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getLikedBlogs = async (req, res) => {
  try {
    const userId = req.user.id;

    const likedBlogs = await Blog.find({
      likes: userId,
    }).populate("author", "name");

    res.status(200).json(likedBlogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 