import express from 'express'
import cors from 'cors'
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
app.use("/user" , userRoutes);

app.listen(PORT, () => {
    console.log("Backend is up and running on port 3000")
})