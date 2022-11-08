const express=require("express")
const contactModel=require("../model/contact")
const contactController=require("../controller/contactController")
const{contactvalidate}=require("../middleware/contact")
const contactRouter=express()
contactRouter.post("/addition",contactvalidate,contactController.contact)
contactRouter.get("/list",contactController.contactlist)
module.exports=contactRouter