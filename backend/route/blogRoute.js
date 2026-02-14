
import express from "express";
import { createBlog, deleteBlog, findBlog, findBlogById, getBlogCount, getCategories, getLikedBlogs, toggleLike, updateBlog } from "../authcontroller/blogController.js";
import multer from "multer";
import path from "path";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/create", upload.single("image"),authMiddleware,adminMiddleware, createBlog);
router.get("/find",findBlog)
router.delete("/delete/:id", authMiddleware, deleteBlog);
router.put("/update/:id", authMiddleware, updateBlog);


router.get("/find/:id", findBlogById);
router.put("/:id/like", authMiddleware, toggleLike);
router.get("/bcount", authMiddleware, adminMiddleware, getBlogCount);

router.get("/liked", authMiddleware, getLikedBlogs);
router.get("/categories", getCategories);




export default router;
