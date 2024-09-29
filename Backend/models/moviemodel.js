import mongoose from "mongoose";

const messageschema=mongoose.Schema({   
    title:{
        type:String,
        required:true
    },
    genre:{
        type:[String],
        required:true,
        default:[]
    },
    released_date:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
       required:true
    },


},{
    timestamps:true
})  

export default mongoose.model("movies",messageschema)