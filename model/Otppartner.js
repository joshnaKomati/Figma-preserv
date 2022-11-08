const mongoose=require("mongoose")
const Otppartner=new mongoose.Schema({
    Email:String,
    Code:String,
    expireIn:Number
})
module.exports=new mongoose.model("Otppartner",Otppartner)