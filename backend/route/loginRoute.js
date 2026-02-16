import express from "express";
import path from "path";
import multer from "multer";
import {
  createLogin,
  getUserCount,
  loginUser,
  logoutUser,
  updateProfile
} from "../authcontroller/loginAuth.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ✅ Routes
router.post("/create", createLogin);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/ucount", getUserCount);

// 🔥 Profile update with photo
router.put("/profp", authMiddleware,upload.single("profilePhoto"), updateProfile);

export default router;
