import mongoose from "mongoose";
const userschema=mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    Username:{
        type:String,
        required:true,
        unique:true
    },
   
    Password:{
        type:String,
        required:true
    },
  userId:{
        type:String,
        required:true,
       
    },
   
},{
    timestamps:true
})

export default mongoose.model("Admin",userschema)