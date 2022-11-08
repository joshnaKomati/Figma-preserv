const mongoose=require("mongoose")
const contactModel=new mongoose.Schema({
    name:String,
    email:String,
    subject:String,
    Your_message:String,
})
module.exports=new mongoose.model("contactInfo",contactModel)