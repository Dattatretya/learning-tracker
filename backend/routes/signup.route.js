import express from "express"
import { signupController } from "../controllers/signup.controller.js";

export const signup = express.Router();

signup.post("/signup", signupController);