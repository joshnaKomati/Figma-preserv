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
         res.json({ message: "email is already exist" })
      } else {
         await usermodel.create({ Fullname, Address, Mobile, City, Email, Password })
         res.json({ message: "user info is added" })
      }
   },
   userlist: async (req, res) => {
      const result = await usermodel.find()
      res.json({ message: "user list is displayd", result })
   },
   userlogin: async (req, res) => {
      const { Email, Password } = req.body
      const checkEmail = await usermodel.findOne({ Email })
      if (checkEmail) {
         if (Password == checkEmail.Password) {
            const token = jwt.sign({ Email }, 'secretkey')
            res.json({ message: "user is logined", token })
         } else {
            res.json({ message: "password is wrong" })
         }
      } else {
         res.json({ message: "email is not exist" })
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
      let data = await Otpuser.find({ Email: req.body.Email, Code: req.body.otpcode })
      const response = {}
      if (data) {
         let currentTime = new Date().getTime()
         let diff = date.expireIn - currentTime
         if (diff < 0) {
            response.message = 'Token expire'
            response.statusText = "success"
         } else {
            let user = await usermodel.findOne({ Email: req.body.Email })
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
   mailer: (Email, otp) => {
      var transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: "joshna93288@gmail.com",
            pass: "fomgihrhzvrwrums"
         }
      })
      var mailOption = {
         from: "joshna93288@gmail.com",
         to: "joshna.vision@gmail.com",
         subject: "Sending email through node.js",
         text: "email testing"
      }
      transporter.sendMail(mailOption, function (error, info) {
         if (error) {
            console.log(error);
         } else {
            console.log("email sent:" + info.response);
         }
      })
   }

}
// console.log('server');