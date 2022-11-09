const mongoose=require("mongoose")
const serviceModel=new mongoose.Schema({
    Title:String,
    Types:Array,
    Service_location:String,
    Service_Duration:String,
    Service_mode:String
})
module.exports=new mongoose.model("Services",serviceModel)