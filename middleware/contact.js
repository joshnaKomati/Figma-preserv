const contactModel=require("../model/contact")
const contactController=require("../controller/contactController")
const Joi=require("joi")
module.exports={
    contactvalidate:async(req,res,next)=>{
        const Schema=Joi.object({
            name:Joi.string().required(),
            email:Joi.string().required(),
            subject:Joi.string().optional(),
            Your_message:Joi.string().optional()
        })
        const result=Schema.validate(req.body)
        if(result.error){
            res.json({message:result.error.details[0].message})
        }else{
            next()
        }
    }
}