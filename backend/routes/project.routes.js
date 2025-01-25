import { Router } from "express";
import { createProject, getProjectByUserId , deleteProject } from "../controllers/project.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/create' , verifyAuth ,createProject);
router.get('/get/:userId' , getProjectByUserId);
router.get('/delete/:projectId' , deleteProject);

export default router;