import Blog from "../model/blogModel.js";
import path from "path";
import fs from "fs";

export const createBlog = async (req, res) => {
  try {
    const { title, district, state, category, description } = req.body;

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
export const getBlogCount = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();

    res.status(200).json({
      totalBlogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findBlog = async (req, res) => {
  try {
    const { category, search = "" } = req.query;
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 5; 
    const skip = (page - 1) * limit;
      


    let filter = {};
    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }
  const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("author", "name email");

    res.status(200).json( {blogs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const findBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email",
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCategories = async (req, res) => {
  try {
    const categories = await Blog.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      blog.likes = blog.likes.filter((id) => id.toString() !== userId);
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

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const imagePath = path.join("uploads", blog.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await blog.deleteOne();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedData = {
      ...req.body,
    };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const rateBlog = async (req, res) => {
  try {
    const { value } = req.body; 
    const userId = req.user.id;

    if (!value || value < 1 || value > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const existingRating = blog.rating.find(
      (r) => r.user.toString() === userId
    );

    if (existingRating) {
      existingRating.value = value;
    } else {
      blog.rating.push({
        user: userId,
        value,
      });
    }

    const total = blog.rating.reduce((acc, item) => acc + item.value, 0);
    blog.averageRating = total / blog.rating.length;

    await blog.save();

    res.status(200).json({
      message: "Rating submitted successfully",
      averageRating: blog.averageRating,
      totalRatings: blog.rating.length,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};