const serviceModel=require("../model/serviceSchema")
const orderModel=require("../model/orderschema")
module.exports={
    //Services
    Renovation :async(req,res)=>{
    const{Title,Types,Service_location,Service_Duration,Service_mode,orderid}=req.body
    const result=await serviceModel.create({Title,Types,Service_location,Service_Duration,Service_mode,orderid})
    res.json({message:"Service Details is Added"})
    },
    Homecleaning:async(req,res)=>{
        const{Title,Types,Service_location,Service_Duration,Service_mode}=req.body
        const result=await serviceModel.create({Title,Types,Service_location,Service_Duration,Service_mode})
        res.json({message:"Service Details is Added",orderid})
    },
    Electrical:async(req,res)=>{
        const{Title,Types,Service_location,Service_Duration,Service_mode}=req.body
        const result=await serviceModel.create({Title,Types,Service_location,Service_Duration,Service_mode})
        res.json({message:"Service Details is Added"})
    },
    Plumbing:async(req,res)=>{
        const{Title,Types,Service_location,Service_Duration,Service_mode}=req.body
        const result=await serviceModel.create({Title,Types,Service_location,Service_Duration,Service_mode})
        res.json({message:"Service Details is Added"})
    },
    PestControl:async(req,res)=>{
        const{Title,Types,Service_location,Service_Duration,Service_mode}=req.body
        const result=await serviceModel.create({Title,Types,Service_location,Service_Duration,Service_mode})
        res.json({message:"Service Details is Added"})
    },
    Home_painting:async(req,res)=>{
        const{Title,Types,Service_location,Service_Duration,Service_mode}=req.body
        const result=await serviceModel.create({Title,Types,Service_location,Service_Duration,Service_mode})
        res.json({message:"Service Details is Added"})
    },
    ServiceList:async(req,res)=>{
        const result=await serviceModel.find().populate([{ path: 'orderid', populate: { path: 'contactId' }}])
        res.json({message:"Service list is Displayed",result})
    },
    
    //Order table
    OrderAdd:async(req,res)=>{
        const {Id,Title,Types,Service_location,Service_Duration,Service_mode}=req.body
        const result=await orderModel.create({Id,Title,Types,Service_location,Service_Duration,Service_mode})
        res.json({message:"Order details is added"})
    },
    OrderList:async(req,res)=>{
        const result=await orderModel.find()
        res.json({message:"order list is Displayed",result})
    },
    OrderSeparate:async(req,res)=>{
        const {id}=req.params
     const result= await orderModel.findByIdAndUpdate(id)
     res.json({message:"Order Details ",result})
    },
}