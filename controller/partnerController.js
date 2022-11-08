const partnermodel=require("../model/partnerSchema")
const bcrypt=require("bcrypt")
const Otppartner=require("../model/Otppartner")
const jwt=require("jsonwebtoken")
const { date } = require("joi")
module.exports={
    newpartner:async(req,res)=>{
        const {Name,Contact_Number,Email,SelectType,ServiceYouOffer,SelelctCity,password,Re_enterPassword}=req.body
        const checkEmail=await partnermodel.findOne({Email})
        if(checkEmail){
            res.json({message:"email is already exist"})
        }else{
            await partnermodel.create({Name,Contact_Number,Email,SelectType,ServiceYouOffer,SelelctCity,password,Re_enterPassword})
            res.json({message:"partner is logined"})
        }
    },
    partnerlist:async(req,res)=>{
        const result=await partnermodel.find()
        res.json({message:"partner details is displayed",result})
    },
    partnerLogin:async(req,res)=>{
        const {Email,Password}=req.body
        const checkEmail=await partnermodel.findOne({Email})
        if(checkEmail){
           if(Password == checkEmail.Password){
              const token=jwt.sign({Email},'secretkey')
              res.json({message:"partner is logined",token})
           }else{
              res.json({message:"password is wrong"})
           }
        }else{
           res.json({message:"email is not exist"})
        }
     },
     Otpemail: async (req, res) => {
        let data = await partnermodel.findOne({ Email: req.body.Email })
        const responseType = {}
        if (data) {
           let otpcode = Math.floor((Math.random() * 10000) + 1)
           let otpData = new Otppartner({
              Email: req.body.Email,
              Code: otpcode,
              expireIn: new Date().getTime() + 600 * 1000
           })
           let otpResponse = await otpData.save()
           responseType.statusText = "Success"
           responseType.message = "please check Your email id"
        } else {
           responseType.statusText = "error",
              responseType.message = "Email Id not Exist"
        }
        res.status(200).json({ message: "Otp Is Generated" })
     },
     ChangePassword: async (req, res) => {
      let data = await Otppartner.find({ Email: req.body.Email, Code: req.body.otpcode })
      const response = {}
      if (data) {
         let currentTime = new Date().getTime()
         let diff = date.expireIn - currentTime
         if (diff < 0) {
            response.message = 'Token expire'
            response.statusText = "success"
         } else {
            let user = await partnermodel.findOne({ Email: req.body.Email })
            user.Password = req.body.Password
            user.save()
            response.message = 'Password changed successFully'
            response.statusText = "success"
         }
      } else {
         response.message = 'Invalid Otp'
         response.statusText = "error"
      }
      res.status(200).json(response)
   },
}