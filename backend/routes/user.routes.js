import { Router } from "express";
import { login, register, updateAvatar, updateUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/register", register);
router.post("/login" , login);
router.post("/update-avatar" , verifyJwt ,upload.single("avatar") ,updateAvatar);
router.post("/update" ,  verifyJwt,updateUser);

export default router;