
import { Router } from "express";
import { getHome, getAbout, postUser, login } from "../controllers/userController.js";



const router = Router()

router.get("/", getHome).get("/about", getAbout).post("/signup", postUser).post("/login", login)

export default router;
