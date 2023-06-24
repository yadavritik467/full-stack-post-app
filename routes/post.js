import express from "express"
import Post from "../modal/post.js"
import { requireSignIn } from "../middleware/requireSign.js"
const router = express.Router()

router.get("/get", async (req,res)=>{
  const text = await Post.find({})
  res.status(200).json({message:" all status  ",text})

} )


router.post("/post", requireSignIn, async(req,res)=>{
    const {title,user,name} = req.body
   

    const text = await Post.create({title,user,name})

    // await text.save()
    res.status(200).json({message:" status updated ",text})


} )



router.put("/edit/:id",requireSignIn,async(req,res)=>{
   
   try {
    const title = req.body.title
    const text = await Post.findById(req.params.id)
    text.title = title;
      await text.save()
    res.status(200).json({message:" status edited  " ,text})
   } catch (error) {
    console.error(error)
   }

} )



router.delete("/delete/:id",requireSignIn, async(req,res)=>{
   

    const text = await Post.findByIdAndDelete(req.params.id)
   
    res.status(200).json({message:" status deleted  "})


}  )


export default router