import mongoose from "mongoose"

const LoginSchema =new mongoose.Schema({
    userId : {
        required: true,
        type: String
    },
    password : {
        type: String, 
        required: true
    }
})

const loginModel = mongoose.model("Login", LoginSchema)

export default loginModel;
