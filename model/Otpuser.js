const mongoose=require("mongoose")
const Otpuser=new mongoose.Schema({
    Email:String,
    Code:String,
    expireIn:Number
})
module.exports=new mongoose.model("Otpuser",Otpuser)