// controllers/blogController.js
import Blog from "../model/blogModel.js";
import path from "path";
import fs from "fs";

export const createBlog = async (req, res) => {
  try {
    const { title, district, state, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newBlog = new Blog({
      title,
      district,
      state,
      description,
      image: req.file.filename,
      author: "698aa4d0a2ef1ab027157932" 
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
