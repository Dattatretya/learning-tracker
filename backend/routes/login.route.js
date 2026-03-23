import express from "express"
import { loginController } from "../controllers/login.controller.js"

const login = express.Router()

login.post("/login", loginController)

export default login