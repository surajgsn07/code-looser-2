import express from 'express'
import cors from 'cors'
import { createServer } from "http";
import { Server } from "socket.io";
import 'dotenv/config';
import connectDb from "./db/index.js";


connectDb();
const app = express();

app.use(express.json());
app.use(cors({
    origin:"https://hack-meets.netlify.app",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

const httpServer = createServer(app);

const io = new Server(httpServer, {
    connectionStateRecovery: {}, 
   cors: {
     origin: process.env.CLIENT_URL || 'https://hack-meets.netlify.app',
     
   },
   pingTimeout: 60000,
 });

 chatSockets(io);

import userRoutes from "./routes/user.routes.js";
import inviteRequestRoutes from "./routes/request.routes.js"
import teamRoutes from "./routes/team.routes.js";
import projectRouted from "./routes/project.routes.js"
import joinRequestRoutes from "./routes/joinRequest.routes.js";
import { chatSockets } from './sockets/socket.js';
import messageRouter from './routes/message.routes.js';

app.use("/joinRequest" , joinRequestRoutes);
app.use("/user" , userRoutes);
app.use('/invite' , inviteRequestRoutes);
app.use('/team' , teamRoutes)
app.use('/project' , projectRouted);
app.use('/message' , messageRouter);


const port = process.env.PORT || 3000;
  httpServer.listen(port, () => {
    console.log(`Worker running at http://localhost:${port}`);
  });
  
