import express from "express"
import {config} from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import userRouter from "./routes/users.js"
import statusRouter from "./routes/post.js"
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express()

config({path:".env"})


const port = process.env.PORT ;

const __filename = fileURLToPath(import.meta.url);
// Get the directory path
const __dirname = dirname(__filename);

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
app.use(express.static(path.join(__dirname, './front/build')));
app.use("/auth",userRouter)
app.use("/status",statusRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './front/build/index.html'));
  });
// app.get("/",(req,res)=>{
//     console.log("working")
// })

app.listen(port,()=>{
    console.log("listening on 5000 ")
})