const { Router } = require("express");
const userRouter = Router();
const bcrypt=require('bcrypt')
const {z}=require('zod');
const jwt=require('jsonwebtoken');
//const jwt_secret='areefsecret';
const mangoose = require('mongoose');
const userModel = require('../db').userModel;
const {JWT_USER_SECRET}=require("../config");




userRouter.post("/signup", async function(req, res) {

    const requiredbody=z.object({
        email:z.string().email(),
        password:z.string().min(6).max(10),
        firstname:z.string().min(3),
        lastname:z.string()
    })
    const parsebodywithsucess=requiredbody.safeParse(req.body);
    if(!parsebodywithsucess){
        res.json({
            message:"incorrect Body",
            error:parsebodywithsucess.error
        })
        return;

    }
    const email=req.body.email;
    const password=req.body.password;
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    let error=false;
    //Todo ZOD validation
    //Hash the password so plaintext pw is not stored in DB
    try {
        const hashedpassword=await bcrypt.hashSync(password,10);
        console.log(hashedpassword);

        await userModel.create({
            email: email,
            password: hashedpassword,
            firstname: firstname,
            lastname: lastname
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

userRouter.post("/signin", async function (req, res) {

    //Todo : Ideally pasword should be hashed and hence you can;t compare the provided password

    const email = req.body.email;
    const password = req.body.password;
    //const newhashedpassword=await bcrypt.hashSync(password,10);
    const user = await userModel.findOne({ email: email});
    if (!user) {
        res.status(403).json({
            message: "Incorrect credentials"
        })

    }
    else {
        const passwordMatch = await bcrypt.compare(password,user.password);
        console.log(user.password);
        console.log("password match");
        if (passwordMatch) {
            console.log("password match sucess");
            const token = jwt.sign({
                id: user._id.toString()

            }, JWT_USER_SECRET);
            res.json({
                message: "Signin succeeded",
                token: token


            });

        }
        else{
            res.status(403).json({
                message: "Incorrect credentials"
            })
    
         }


    }
})

userRouter.get("/purchases", async function(req, res) {
    res.json({
        message: "Signup succeeded"
    })
})

module.exports = {
    userRouter
}