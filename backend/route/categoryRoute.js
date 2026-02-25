import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../authcontroller/categoryController.js";

const router = express.Router();

router.post("/create", createCategory);
router.get("/all", getCategories);
router.delete("/delete/:id", deleteCategory);

export default router;
