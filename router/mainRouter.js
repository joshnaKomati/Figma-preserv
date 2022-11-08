const express=require("express")
const userRouter=require("./userRouter")
const partnerRouter=require("./partnerRouter")
const contactRouter=require("./contactRouter")
const mainRouter=express()
mainRouter.use("/user",userRouter)
mainRouter.use("/partner",partnerRouter)
mainRouter.use("/contact",contactRouter)
module.exports=mainRouter