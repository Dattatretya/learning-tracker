import bcrypt from "bcrypt"
import signupModel from "../models/signup.model.js";

export const signupController = async (req, res)=>{

    try{
        console.log("req body",req.body)

        const {userId, password} = req.body;

        console.log(userId)
        
        if (!userId || !password){
            return res.status(404).send({
                message:"UserId and password is required"
            })
        }

        const userExists = await signupModel.findOne({userId});

        console.log(userExists)

        if (userExists){
            return res.status(400).send({message: "User already exists"});
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        console.log(encryptedPassword)

        const userCreds = new signupModel({userId: userId, password: encryptedPassword})

        console.log(userCreds)

        await userCreds.save();

        return res.status(200).send({
            message: `User created with id ${userId}`,
            status: "success"
        })

    }
    catch(err){
        res.status(500).send({
            message: "Internal Server error",
            err: err
        })
    }
}