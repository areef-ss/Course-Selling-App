const express = require("express");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { default: mongoose } = require("mongoose");


const app = express();
app.use(express.json());


app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course", courseRouter);


async function main() {

    //use .env file
    await mongoose.connect("mongodb+srv://areef0463:LgBYlfwFd9b9h75V@cluster0.8z2a8.mongodb.net/Course-App");
    app.listen(3000);
    console.log("listening on port 3000");    
}

main();
