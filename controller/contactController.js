const contactModel=require("../model/contact")
module.exports={
    contact:async(req,res)=>{
        const{name,email,subject,Your_message}=req.body
        await contactModel.create({name,email,subject,Your_message})
        res.json({message:"contact details is added"})
    },
    contactlist:async(req,res)=>{
        const result=await contactModel.find()
        res.json({message:"contact list",result})

    }
}