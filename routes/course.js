const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/purchase", async function(req, res) {

    res.json({
        message: "You have successfully bought the course"
    })
})

courseRouter.get("/preview", async function(req, res) {
    res.json({
        message: "Course preview"
    })
})

module.exports = {
    courseRouter: courseRouter
}