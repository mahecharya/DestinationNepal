import express from "express"
import { createLogin } from "../authcontroller/loginAuth.js";

const router=express.Router();
router.post("/create",createLogin)

export default router