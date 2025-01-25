import { Router } from "express";
import { addMultipleUsers, GoogleSignIn, loginUser, registerUser, updateAvatar, updateUser, verifyUserToken } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import {verifyAuth } from "../middlewares/auth.middleware.js"
 const router = Router();

router.post("/register", registerUser);
router.post('/addMany',addMultipleUsers )
router.post("/login", loginUser);
router.post("/gsignin",GoogleSignIn)
router.post("/update-avatar", verifyAuth, upload.single("avatar"), updateAvatar);
router.post("/update", verifyAuth, updateUser);
router.get('/verifyauth',verifyUserToken);

export default router;