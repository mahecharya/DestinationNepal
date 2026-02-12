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
    const blogs = await Blog.find()
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

