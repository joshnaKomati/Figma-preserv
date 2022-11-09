const partnermodel=require("../model/partnerSchema")
const bcrypt=require("bcrypt")
const Otppartner=require("../model/Otppartner")
const jwt=require("jsonwebtoken")
const nodemailer=require("nodemailer")
const { date } = require("joi")
module.exports={
    newpartner:async(req,res)=>{
        const {Name,Contact_Number,Email,SelectType,ServiceYouOffer,SelelctCity,password,Re_enterPassword}=req.body
        const checkEmail=await partnermodel.findOne({Email})
        if(checkEmail){
            res.status(404).json({message:"email is already exist"})
        }else{
            await partnermodel.create({Name,Contact_Number,Email,SelectType,ServiceYouOffer,SelelctCity,password,Re_enterPassword})
            res.status(200).json({message:"partner is logined"})
        }
    },
    partnerlist:async(req,res)=>{
        const result=await partnermodel.find()
        res.status(200).json({message:"partner details is displayed",result})
    },
    partnerLogin:async(req,res)=>{
        const {Email,Password}=req.body
        const checkEmail=await partnermodel.findOne({Email})
        if(checkEmail){
           if(Password == checkEmail.Password){
              const token=jwt.sign({Email},'secretkey')
              res.status(200).json({message:"partner is logined",token})
           }else{
              res.status(404).json({message:"password is wrong"})
           }
        }else{
           res.status(404).json({message:"email is not exist"})
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
     const {Email,password,Code}=req.body
     const result=await partnermodel.create({Email,password,Code})
     res.json({message:"Password changed successfully"})
   },
   partnermailer:(Email, otp) => {
      var transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: "joshnakomati.vision@gmail.com",
            pass: "imachgmdqjuemqaz"
         }
      })
      var mailOption = {
         from: "joshnakomati.vision@gmail.com",
         to: "joshna93288@gmail.com",
         subject: "Sending email through node.js",
         text: "email testing"
      }
      transporter.sendMail(mailOption, function (error, info) {
         if (error) {
            console.log(error.message);
         } else {
            console.log("email sent:" + info.response);
         }
      })
   }
}