import { Router } from "express";
import {checkAuth, login, logout, signup, updateProfile} from "../controllers/auth.controller.js";

const router = Router()

router.post("/login", login)
router.post("/signup", signup)
router.post("/logout", logout)

router.put("/update-profile", updateProfile)
router.get("/check", checkAuth)

export default router