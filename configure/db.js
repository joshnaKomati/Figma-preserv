const mongoose=require("mongoose")
mongoose.connect('mongodb://localhost:27017/proserve',()=>{
    console.log("db is connected");
})