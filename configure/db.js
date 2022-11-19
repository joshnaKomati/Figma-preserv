const mongoose=require("mongoose")
// mongoose.connect('mongodb+srv://joshna123:Joshna@cluster0.ke8bcxw.mongodb.net/proserve',(err)=>{
require("dotenv").config()
    mongoose.connect(process.env.dbConnection,(err)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log("db is connected");
        }
    })
   