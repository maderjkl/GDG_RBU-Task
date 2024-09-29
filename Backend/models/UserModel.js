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
    gender:{
        type:String,
        required:true,
        enum:["Male","Female","Other"]
    },
   
},{
    timestamps:true
})

export default mongoose.model("user",userschema)