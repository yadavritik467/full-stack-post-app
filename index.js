import express from "express"
import {config} from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import userRouter from "./routes/users.js"
import statusRouter from "./routes/post.js"



const app = express()

config({path:".env"})


const port = process.env.PORT ;



const mongoDB = async()=>{
   try {
    await mongoose.connect(process.env.MONGODB,{ useNewUrlParser: true, useUnifiedTopology: true })
    console.log("db is connected")
   } catch (error) {
    console.log("db is not connected")
   }
}

mongoDB()

app.use(cors())
app.use(express.json())
app.use("/auth",userRouter)
app.use("/status",statusRouter)

app.get('/', (req, res) => {
    console.log("working")
  });
// app.get("/",(req,res)=>{
//     console.log("working")
// })

app.listen(port,()=>{
    console.log("listening on 5000 ")
})
