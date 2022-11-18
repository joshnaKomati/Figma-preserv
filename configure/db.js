const mongoose=require("mongoose")
// mongoose.connect('mongodb+srv://joshna123:Joshna@cluster0.ke8bcxw.mongodb.net/proserve',(err)=>{
    mongoose.connect("mongodb://localhost:27017/proserve",(err)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log("db is connected");
        }
    })
   