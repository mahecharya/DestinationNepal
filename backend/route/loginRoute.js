import express from "express"
import { createLogin, getUserCount, loginUser, logoutUser } from "../authcontroller/loginAuth.js";

const router=express.Router();
router.post("/create",createLogin)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/ucount", getUserCount)



export default router