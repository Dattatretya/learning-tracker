import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import login from "./routes/login.route.js";
import cors from "cors"

dotenv.config()

const app = express();

app.get("/", (req, res)=> {
    res.status(200).send({
        message: "I am listening"
    })
})

// app.use(cors)

app.use("/api/v1", login)

app.listen(process.env.PORT, ()=>{
    console.log(`Listening to ${process.env.PORT}`)
    mongoose.connect("mongodb://localhost:27017/")
})