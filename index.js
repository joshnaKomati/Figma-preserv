const express=require('express')
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// require("./configure/db")
require("./configure/db")
const mainRouter=require("./router/mainRouter")
app.use("/api",mainRouter)
app.listen(4000,()=>{
    console.log("server is working");
})