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
         res.status(200).json({ message: "user info is added" })
      }
   },
   userlist: async (req, res) => {
      const result = await usermodel.find()
      res.status(200).json({ message: "user list is displayd", result })
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
      let data = await usermodel.findOne({ Email: req.body.Email })
      const responseType = {}
      if (data) {
         let otpcode = Math.floor((Math.random() * 10000) + 1)
         let otpData = new Otpuser({
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
      res.status(200).json({ message: "ok" })
   },
   ChangePassword: async (req, res) => {
      const {Email,Password,Code}=req.body
    const result=await usermodel.create({Email,Password,Code})
    res.json({message:"password changed successfully",result})
   }, 
  userMailer: async (req, res) => {
    console.log("📢[userController.js:61]: Email: ", req.body.Email);
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
      subject: "Sending email through node.js",
      text: "email testing",
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
};
console.log("server");
