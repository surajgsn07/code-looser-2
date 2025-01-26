import { Router } from "express";
import { acceptRequest, createRequest, getTeamRequests, getUserRequests, rejectReuqest, withdrawRequest } from "../controllers/request.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/create' , verifyAuth,createRequest);
router.post('/accept',verifyAuth , acceptRequest);
router.get('/withdraw/:id' , withdrawRequest);
router.get('/user' , verifyAuth , getUserRequests);
router.get('/team/:teamId' , verifyAuth , getTeamRequests);
router.get('/reject/:requestId' , verifyAuth , rejectReuqest);


export default router;