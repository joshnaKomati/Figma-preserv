const mongoose=require("mongoose")
const orderModel=new mongoose.Schema({
    Id:String,
    Title:String,
    Types:Array,
    Service_location:String,
    Service_Duration:String,
    Service_mode:String,
    contactId:{ type: mongoose.Schema.Types.ObjectId, ref: 'contactInfo' }

})
module.exports=new mongoose.model("OrderDetails",orderModel)