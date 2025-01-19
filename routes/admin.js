const Router = require("express").Router;
const adminRouter=Router();
const {adminModel}=require("../db");

adminRouter.post("/signup",function(req,res){
    res.json({
        message:"signup endpoint"
    })
})

adminRouter.post("/signin",function(req,res){
    res.json({
        message:"signup endpoint"
    })
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


adminRouter.get("/corse",function(req,res){
    res.json({
        message:"signup endpoint"
    })
})

module.exports={
    adminRouter : adminRouter
}
