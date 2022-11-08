const partnermodel=require("../model/partnerSchema")
const partnerController=require("../controller/partnerController")
const Joi=require('joi')
const jwt=require("jsonwebtoken")
module.exports={
    partnervalidate:async(req,res,next)=>{
        const Schema=Joi.object({
            Name:Joi.string().required(),
            Contact_Number:Joi.number().required(),
            Email:Joi.string().required(),
            SelectType:Joi.array().required(),
            ServiceYouOffer:Joi.string().required(),
            SelelctCity:Joi.string().required(),
            password:Joi.string().required(),
            Re_enterPassword:Joi.string().required()
        })
        const result=Schema.validate(req.body)
        if(result.error){
      res.json({message:result.error.details[0].message})
        }else{
            next()
        }
    },
    verifytoken:async(req,res,next)=>{
        const bearerHeader=req.headers['authorization']
        if(typeof bearerHeader !=='undefined'){
            try {
                const data=jwt.verify(bearerHeader ,'secretkey')
                const result=await partnermodel.findOne({Email:data.Email})
            if(result){
                next()
            }else{
                res.json({message:"email is not valid"})
            }
            } catch (error) {
                res.json({message:error.message})
            }
        }else{
            res.json({message:"mentined valid token"})
        }
    } 
}