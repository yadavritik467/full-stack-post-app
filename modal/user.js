import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    cpassword:{
        type:String,
        required:true,
        trim:true,
    }
})

const user = mongoose.model("User",userSchema)

export default user