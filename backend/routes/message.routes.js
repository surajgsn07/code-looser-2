import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import {   fetchMessages, sendMessage } from "../controllers/message.controller.js";
const messageRouter = Router();

messageRouter.post('/', verifyAuth, sendMessage);
 messageRouter.get('/:chatId', verifyAuth, fetchMessages);


export default messageRouter;