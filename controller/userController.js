const usermodel = require("../model/userSchema")
const Otpuser = require("../model/Otpuser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const { date } = require("joi")
module.exports = {
   newuser: async (req, res) => {
      const { Fullname, Address, Mobile, City, Email, Password } = req.body
      const checkEmail = await usermodel.findOne({ Email })
      if (checkEmail) {
         res.status(404).json({ message: "email is already exist" })
      } else {
         await usermodel.create({ Fullname, Address, Mobile, City, Email, Password })
         // res.status(200).json({ message: "IsAuthenticated:true,Success:true,message:"})
         res.json({	"IsAuthenticated" : true,
         "Success" : true,
         "Message" : "User is authenticated",
         "Data" : {
            "Email" : req.body.Email,
         }})
      }
   },
   userlist: async (req, res) => {
      const result = await usermodel.find()
      res.status(200).json({ message: "user list is displayd", result })
   },
   userupdate: async (req, res) => {
      const { Fullname, Address, Mobile, City, Email, Password, id } = req.body
      const checkId = await usermodel.findById(id)
      if (checkId) {
         await usermodel.findByIdAndUpdate(id, { Fullname, Address, Mobile, City, Email, Password })
         res.json({ message: "user details is updatede", checkId })
      } else {
         res.json({ message: "user details does not updated" })
      }
   },
   userlogin: async (req, res) => {
      const { Email, Password } = req.body
      const checkEmail = await usermodel.findOne({ Email })
      if (checkEmail) {
         if (Password == checkEmail.Password) {
            const token = jwt.sign({ Email }, 'secretkey')
            res.status(200).json({ message: "user is logined", token })
         } else {
            res.status(404).json({ message: "password is wrong" })
         }
      } else {
         res.status(404).json({ message: "email is not exist" })
      }
   },
   Otpemail: async (req, res) => {
      let data = await usermodel.find({ Email: req.body.Email })
      const responseType = {}
      if (data) {
         let otpcode = Math.floor((Math.random() * 10000) + 1)
         let otpData = new Otpuser({
            Email: req.body.Email,
            Code: otpcode,
            expireIn: new Date().getTime() + 400 * 1000
         })
         let otpResponse = await otpData.save()
         responseType.statusText = "Success"
         responseType.message = "please check Your email id"
      } else {
         responseType.statusText = "error",
            responseType.message = "Email Id not Exist"
      }
      res.status(200).json({ message: "Otp is Genearated" }) 
   },
   // ChangePassword: async (req, res) => {
   //    const { Email, Password, Code } = req.body
   //    const checkCode=await usermodel.findOne({Code})
   //    if(checkCode){
   //       const result = await usermodel.create({ Email, Password, Code })
   //       res.json({ message: "password changed successfully", result })
   //       // res.status(404).json({message:"Code is not valid"})
   //    }else{
        
   //    }
   // },
   changepassword:async(req,res)=>{
   let data=await Otpuser.find({Email:req.body.Email,Password:req.body.Password,Code:req.body.body})
   const response={}
   if(data){
      // let currentTime=new Date().getTime()
      let diff=data.expireIn-currentTime
      if(diff<0){
         console.log("token expires");
         response.message="Token expires"
         response.statusText="Error"
      }else{
         let user=await usermodel.findOne({Email:req.body.Email})
         user.Password=req.body.Password
         user.Code=req.body.Code
         user.save()
         console.log("passwrd changed");
         response.message="Passwod chaged"
         res.json({message:"password changed"})
         response.statusText="Success"
      }
   }else{
      console.log("invalid otp");
      response.message="Invalid Otp"
      response.statusText="error"
   }
   },
   userMailer: async (req, res) => {
      console.log("📢[userController.js:61]: Email: ", req.body.Email, req.body.Code);
      var transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: "joshnakomati.vision@gmail.com",
            pass: "imachgmdqjuemqaz",
         },
      });
      var mailOption = {
         from: "joshnakomati.vision@gmail.com",
         to: req.body.Email,
         subject: `Sending email through node.js `,
         text: `Otp Generate Successfuly 
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
