const mongoose=require('mongoose')
const usermodel=new mongoose.Schema({
    Fullname:String,
    Address:String,
    Mobile:Number,
    City:String,
    Email:String,
    Password:String,
})
module.exports=new mongoose.model("userinfo",usermodel)