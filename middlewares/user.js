const jwt=require("jsonwebtoken");
const {JWT_USER_SECRET}=require("../config");


function userMiddleware(req,res,next){
    const token=req.body.token;
    const decoded=jwt.verify(token,JWT_USER_SECRET);

    if(decoded){
        req.userId=decoded.id;
        next();
    }
    else{
        res.status(403).json({
            message:"Incorrect token"
        })  
    }

}


module.exports={
    userMiddleware
}