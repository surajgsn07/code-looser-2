import { Router } from "express";
import { createTeam, deleteTeamById, getAllTeams, SearchTeam, updateTeamById } from "../controllers/team.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
const router = Router();


router.get('/create' , verifyAuth ,createTeam);
router.get('/all',getAllTeams)
router.get('/search/:name',SearchTeam);
router.get('/delete/:id' , deleteTeamById)
router.post('/update/:id' , updateTeamById);

export default router;