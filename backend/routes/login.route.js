import express from "express"
import { loginController } from "../controllers/login.controller.js"

const login = express.Router()

login.get("/login", loginController)

export default login