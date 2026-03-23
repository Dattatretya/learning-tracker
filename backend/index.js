import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import login from "./routes/login.route.js";
import cors from "cors"
import { signup } from "./routes/signup.route.js";

dotenv.config()

const app = express();

app.use(express.json())

app.get("/", (req, res)=> {
    res.status(200).send({
        message: "I am listening"
    })
})

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions))

app.use("/api/v1", login)
app.use("/api/v1", signup)

app.listen(process.env.PORT, ()=>{
    console.log(`Listening to ${process.env.PORT}`)
    mongoose.connect("mongodb://localhost:27017/learning-tracker")
})