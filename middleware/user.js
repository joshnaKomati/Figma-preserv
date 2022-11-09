const usermodel=require("../model/userSchema")
const userController=require("../controller/userController")
// const nodemailer=require("../controller/nodemailer")
const Joi=require("joi")
const jwt =require("jsonwebtoken")
module.exports={
    uservalidate:async(req,res,next)=>{
        const Schema=Joi.object({
            Fullname:Joi.string().required(),
            Address:Joi.string().required(),
            Mobile:Joi.number().required(),
            City:Joi.string().required(),
            Email:Joi.string().required(),
            Password:Joi.string().required(),
        })
        const result=Schema.validate(req.body)
        if(result.error){
            res.json({message:result.error.details[0].message})
        }else{
            next()
        }
    },
    uservalidation:async(req,res,next)=>{
    const Schema=Joi.object({
        Email:Joi.string().required(),
        Password:Joi.string().required(),
        Code:Joi.string().max(4).required()
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
                const result=await usermodel.findOne({Email:data.Email})
                if(result){
                    next()
                }else{
                    res.json({message:"email is not valid"})
                }
            } catch (error) {
                res.json({message:error.message})
            }
        }else{
            res.json({message:"mentioned valid token"})
        }
    }
}