import bcrypt from "bcrypt"
import signupModel from "../models/signup.model.js";

export const loginController = async (req, res) => {
 const {userId, password} = req.body;
 try{
    if (!userId || !password){
        return res.status(400).send({
            message:"UserId or paassword is a required field"
        })
    }

    const userInDb = await signupModel.findOne({userId});



    if (!userInDb){
        return res.status(404).send({
            message: "User does not exist"
        })
    }
    console.log(userInDb)
    const passwordFromDb = userInDb.password
    const passwordMatch = await bcrypt.compare(password, passwordFromDb);

    if (!passwordMatch){
        return res.status(401).send({
            message: "UserID or Password does not match"
        })
    }

    return res.status(200).send({
        status: "success",
        message: "Login Successful"
    })

 }
 catch(err){
    res.status(500).send({
        message:"Internal server error"
    })
 }
}
