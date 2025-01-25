import { Router } from "express";
import { acceptJoinRequest, createJoinRequest, getJoinRequestsByTeamId, withdrawJoinRequest } from "../controllers/joinRequest.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
const router = Router();

router.get('/create/:teamId' , verifyAuth,createJoinRequest);
router.get('/get/:teamId' , getJoinRequestsByTeamId);
router.get('/delete/:teamId' ,verifyAuth, withdrawJoinRequest);
router.get('/accept/:requestId' , verifyAuth, acceptJoinRequest);


export default router;