import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,

    },
    name:{
      type:String,
      
    },
    title:{
        type:String,
        required:true,
    }
})

const post = mongoose.model("post",postSchema)

export default post