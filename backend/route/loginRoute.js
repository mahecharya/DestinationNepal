import express from "express"
import { createLogin, loginUser, logoutUser } from "../authcontroller/loginAuth.js";

const router=express.Router();
router.post("/create",createLogin)
router.post("/login", loginUser)
router.post("/logout", logoutUser)



export default router