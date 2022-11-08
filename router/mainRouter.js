const express=require("express")
const userRouter=require("./userRouter")
const partnerRouter=require("./partnerRouter")
const mainRouter=express()
mainRouter.use("/user",userRouter)
mainRouter.use("/partner",partnerRouter)
module.exports=mainRouter