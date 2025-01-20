const { Schema, default: mongoose } = require("mongoose");
const ObjectId =mongoose.Types.ObjectId;
//console.log("conneccted to");



const userSchema= new Schema({
    email: {type: String,unique: true},
    password: String,
    firstnam: String,
    lastname: String,
});

const adminSchema =new Schema({
    email: {type: String,unique: true},
    password: String,
    firstnam: String,
    lastname: String,
});

const courseSchema =new Schema({
    title: String,
    descreiption:String,
    price: Number,
    imageurl: String,
    creatorId: ObjectId

});

const purchaseSchema =new Schema({
    userId: ObjectId,
    courseId:ObjectId

});

const userModel = mongoose.model("user",userSchema);
const adminModel = mongoose.model("admin",adminSchema);
const courseModel = mongoose.model("course",courseSchema);
const purchaseModel = mongoose.model("purchase",purchaseSchema);

module.exports={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};
