const Router = require("express").Router;
const adminRouter=Router();
const {adminModel}=require("../db");
const {z}=require("zod");
const jwt=require("jsonwebtoken");
const jwt_secret="adminsecret";
const {JWT_ADMIN_SECRET}=require("../config");
const bcrypt=require("bcrypt");
const {adminMiddleware}=require("../middlewares/user");
//bcrypt,zod,jsonwebtoen

adminRouter.post("/signup",async function(req,res){
    const requiiredbody=z.object({
        email:z.string().email(),
        password:z.string().min(6).max(10),
        firstname:z.string().min(3).max(10),
        lastname:z.string().min(3).max(10)
    })

    const parsedbody=requiiredbody.safeParse(req.body);
    if(!parsedbody){
        res.jsodn({
            message:"incorrect body",
            error:parsedbody.error
        })
    }

    const email=req.body.email;
    const password=req.body.password;
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    let error=false;

    try{
        const hashedpassword=await bcrypt.hashSync(password,10);
        await adminModel.create({
            email:email,
            password:hashedpassword,
            firstname:firstname,
            lastname:lastname
        })
    }
    catch(e){
        res.json({
            message:e.message
        })
        error=true;
    }

    if(!error){
        res.json({
            message:"Signup succeeded"
        })
        
    }
})

adminRouter.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const admin=await adminModel.findOne({email:email});
    if(admin){
        const passwordMatch=await bcrypt.compare(password,admin.password);
        if(!passwordMatch){
            res.status(403).json({
                message:"Incorrect credentials"
            })
        }
        else{
            const token=jwt.sign({
                id:admin._id.toString()
            },JWT_ADMIN_SECRET);
            res.json({
                message:"Signin succeeded",
                token:token
            })
        }
    }
    
})


adminRouter.post("/course",adminMiddleware,async function(req,res){
    const adminId=req.userId;
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const imageurl=req.body.imageurl;
    const creatorId=req.userId;

    try{
        await courseModel.create({
            title:title,
            description:description,
            price:price,
            imageurl:imageurl,
            creatorId:creatorId
        })
        res.json({
            message:"Course created successfully"
        })
    }
    catch(e){
        res.json({
            message:e.message
        })
    }


})

adminRouter.put("/course",function(req,res){
    res.json({
        message:"signup endpoint"
    })
})


adminRouter.get("/course/bulk",function(req,res){
    res.json({
        message:"signup endpoint"
    })
})

module.exports={
    adminRouter : adminRouter
}
