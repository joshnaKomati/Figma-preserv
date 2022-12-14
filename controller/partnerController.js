const partnermodel = require("../model/partnerSchema")
const bcrypt = require("bcrypt")
const Otppartner = require("../model/Otppartner")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const { date } = require("joi")
module.exports = {
   newpartner: async (req, res) => {
      const { Name, Contact_Number, Email, SelectType, ServiceYouOffer, SelelctCity, password, Re_enterPassword } = req.body
      const checkEmail = await partnermodel.findOne({ Email })
      if (checkEmail) {
         res.status(404).json({ message: "email is already exist" })
      } else {
         await partnermodel.create({ Name, Contact_Number, Email, SelectType, ServiceYouOffer, SelelctCity, password, Re_enterPassword })
        res.json({"IsAuthenticated" : true,
        "Success" : true,
        "Message" : "User is authenticated",
        "Data" : {
           "Email" : req.body.Email,}})
      }
   },
   partnerlist: async (req, res) => {
      const result = await partnermodel.find()
      res.status(200).json({ message: "partner details is displayed", result })
   },
   partnerLogin: async (req, res) => {
      const { Email, Password } = req.body
      const checkEmail = await partnermodel.findOne({ Email })
      if (checkEmail) {
         if (Password == checkEmail.Password) {
            const token = jwt.sign({ Email }, 'secretkey')
            res.status(200).json({ message: "partner is logined", token })
         } else {
            res.status(404).json({ message: "password is wrong" })
         }
      } else {
         res.status(404).json({ message: "email is not exist" })
      }
   },
   Otpemail: async (req, res) => {
      let data = await partnermodel.find({ Email: req.body.Email })
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
   // otpverify:async(req,res)=>{
   //  try {
   //    let{Email,Code}=req.body
   //    if(!Email  || !Code){
   //       throw Error("Empty otp details are not allowed")
   //    }else{
   //      const otpVerification= await partnermodel.find({Email})
   //    }
   //    if(otpVerification.length<=0){
   //       throw new Error("Account record does not exist")
   //    }
      
   //  } catch (error) {
      
   //  }
   // },
   ChangePassword: async (req, res) => {
      const { Email, password, Code } = req.body
      const result = await partnermodel.create({ Email, password, Code })
      res.json({ message: "Password changed successfully" })
   },
   partnermailer: async (req, res) => {
      console.log("????[PartnerController.js:61]: Email: ", req.body.Email, req.body.Code);
      var transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: "joshna93288@gmail.com",
            pass: "ptowlyrailevdqjz",
         },
      });
      var mailOption = {
         from: "joshna93288@gmail.com",
         to: req.body.Email,
         subject: `Sending email through node.js `,
         text: `Otp Generate Succesfully
              Code ${req.body.Code}
        `,
      };
      transporter.sendMail(mailOption, function (error, info) {
         if (error) {
            console.log(error.message);
            res.json({ message: error.message });
         } else {
            console.log("email sent:" + info.response);
            res.json({ message: "email is sent" });
         }
      });
   },
}