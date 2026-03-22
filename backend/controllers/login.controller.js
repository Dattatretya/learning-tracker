import loginModel from "../models/login.model.js";
import bcrypt from "bcrypt"

export const loginController = async (req, res) => {
 const {userId, password} = req.body;
 try{
    if (!userId || !password){
        res.status(400).send({
            message:"UserId or paassword is a required field"
        })
    }

    const userInDb = loginModel.findOne(userId);

    if (!userInDb){
        res.status(404).send({
            message: "User does not exist"
        })
    }
    const passwordFromDb = userInDb.password
    const passwordMatch = bcrypt.compare(password, passwordFromDb);

    if (!passwordMatch){
        res.status(401).send({
            message: "UserID or Password does not match"
        })
    }

    res.status(200).send({
        status: "success",
        message: "Login Successfu;"
    })

 }
 catch(err){
    res.status(500).send({
        message:"Internal server error"
    })
 }
}