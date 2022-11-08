const mongoose=require("mongoose")
const partnermodel=new mongoose.Schema({
    Name:String,
    Contact_Number:String,
    Email:String,
    SelectType:Array,
    ServiceYouOffer:String,
    SelelctCity:String,
    password:String,
    Re_enterPassword:String
})
module.exports=new mongoose.model("partner",partnermodel)