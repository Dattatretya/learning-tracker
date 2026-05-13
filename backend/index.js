import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import login from "./routes/login.route.js";
import cors from "cors"
import { signup } from "./routes/signup.route.js";
import { todo } from "./routes/todos.routes.js";

dotenv.config()

const app = express();

app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions))

app.get("/", (req, res)=> {
    res.status(200).send({
        message: "I am listening"
    })
})

app.use("/api/v1", login)
app.use("/api/v1", signup)
app.use("/api/v1", todo)

//using process.env just a small change
app.listen(process.env.PORT, ()=>{
    console.log(`Listening to ${process.env.PORT} for a while`)
    mongoose.connect(process.env.MONGO_URI)
})   