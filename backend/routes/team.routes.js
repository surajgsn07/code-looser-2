import { Router } from "express";
import { createTeam, deleteTeamById, getAllTeams, getUserTeams, SearchTeam, updateTeamById } from "../controllers/team.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
const router = Router();


router.post('/create' , verifyAuth ,createTeam);
router.get('/all',getAllTeams)
router.get('/search/:name',SearchTeam);
router.get('/delete/:id' , deleteTeamById)
router.post('/update/:id' , updateTeamById);
router.get('/user' ,verifyAuth , getUserTeams)

export default router;