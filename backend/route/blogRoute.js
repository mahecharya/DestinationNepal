
import express from "express";
import { createBlog, findBlog, findBlogById } from "../authcontroller/blogController.js";
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
router.get("/find/:id", findBlogById);


export default router;
