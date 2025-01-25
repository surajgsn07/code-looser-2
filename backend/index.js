import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import connectDb from "./db/index.js";


connectDb();
const app = express();
const PORT = 3000;


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

import userRoutes from "./routes/user.routes.js";
import requestRoutes from "./routes/request.routes.js"
import teamRoutes from "./routes/team.routes.js";
import projectRouted from "./routes/project.routes.js"
app.use("/user" , userRoutes);
app.use('/request' , requestRoutes);
app.use('/team' , teamRoutes)
app.use('/project' , projectRouted);


app.listen(PORT, () => {
    console.log("Backend is up and running on port 3000")
})