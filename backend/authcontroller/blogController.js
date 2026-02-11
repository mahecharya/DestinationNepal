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
