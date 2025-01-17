const { Router } = require("express");

const userRouter = Router();

userRouter.post("/signup", async function(req, res) {
    res.json({
        message: "Signup succeeded"
    })
})

userRouter.post("/signin",async function(req, res) {
    
        res.status(403).json({
            message: "Incorrect credentials"
        })
    
})

userRouter.get("/purchases", async function(req, res) {
    res.json({
        message: "Signup succeeded"
    })
})

module.exports = {
    userRouter: userRouter
}