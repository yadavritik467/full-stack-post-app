import JWT from "jsonwebtoken";


export const requireSignIn = async (req, res, next) => {
    let JWT_SECRET = "asdaddasasd"
    try {
        const token =  req.header('Authorization')
        const decode =   JWT.verify(token,JWT_SECRET)
        if(req.user = decode){

            // console.log(req.user,token,"hii")
            next()
        }else{
            res.json({ message:"login first"})
        }
        
    } catch (error) {
        console.log(error);
        res.status(501).json({error: error})
    }
}