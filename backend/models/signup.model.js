import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const signupModel = mongoose.model("Signup", signupSchema)

export default signupModel