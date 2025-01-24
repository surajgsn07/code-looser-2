import { Router } from "express";
import { GoogleSignIn, loginUser, registerUser, updateAvatar, updateUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import {verifyAuth } from "../middlewares/auth.middleware.js"
 const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/gsignin",GoogleSignIn)
router.post("/update-avatar", verifyAuth, upload.single("avatar"), updateAvatar);
router.post("/update", verifyAuth, updateUser);

export default router;