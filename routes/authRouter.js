import express from "express"
import { registerUser, loginUser, getCurrentUser, logoutUser, getAllUser } from "../controllers/authController.js"
import { protectedMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

//post /api/v1/auth/register
router.post("/register", registerUser)

//post /api/v1/auth/login
router.post("/login", loginUser);

//get /api/v1/auth/logout
router.get("/logout",logoutUser);

//get /api/v1/auth/getCurrentUser
router.get("/getUser", getCurrentUser);

//get /api/v1/auth/user
router.get("/getAllUser", protectedMiddleware, getAllUser);

export default router;
