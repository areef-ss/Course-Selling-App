const Router = require("express").Router;
const adminRouter=Router();
const {adminModel}=require("../db");
const {z}=require("zod");
const jwt=require("jsonwebtoken");
const jwt_secret="adminsecret";
const bcrypt=require("bcrypt");
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
            },jwt_secret);
            res.json({
                message:"Signin succeeded",
                token:token
            })
        }
    }
    
})


adminRouter.post("/course",function(req,res){
    res.json({
        message:"signup endpoint"
    })



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
