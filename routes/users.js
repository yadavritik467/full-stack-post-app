import express from "express"
import User from "../modal/user.js"
import jwt from "jsonwebtoken"
const router = express.Router()


router.get('/get', async (req,res)=>{
    const user = await User.find({})
    res.status(200).json({message:" all users  ",user})
  
  } )

router.post("/register", async (req, res) => {

    try {
        const { name, email, password, cpassword} = req.body
        const existingUser = await User.findOne({ email:email })
        if (existingUser) {
            return res.status(500).json({ message: "this email is already in user", existingUser })
        }

       if(user.password !== user.cpassword){
        res.status(500).json({message:"password mismatch"})
       }else{

           res.status(200).json({message:"user created successfully",user})
           await user.save()
        }

        
    } catch (error) {
        console.log(error)
        res.status(500).json("internal server")
    }
})



router.post("/login",async (req, res) => {
    try {
          let email= req.body.email
          let password= req.body.password
          let JWT_SECRET = "asdaddasasd"
        const user = await User.findOne({ email}).select("+password")

        if (!user) {
            return res.status(400).json({ message: "User doesn't exist !! please create account " })
        }
        if( password !== user.password ) {
            return res.status(400).json({ message: "wrong passwrod" })
        }
       
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "365d", })
         
        res.json({message:"login successfully", user, token})
        
    } catch (error) {
        console.log(error)
        res.status(500).json("internal server")
    }
})




export default router
