import express from "express";
import dotenv from "dotenv";
import connectDB from "./MongoConnnect/db.js";
import movieroutes from "./routes/movieroutes.js";
import userroutes from "./routes/userroutes.js";
import Adminroutes from "./routes/Adminroutes.js";
import cors from "cors";
dotenv.config();





const app=express();
app.use(express.json());
app.use(cors(
    {
        origin:"http://localhost:5173",
        methods:"GET,POST,PUT,DELETE",
        credentials:true
    }
));
app.use('/movie',movieroutes);
app.use('/admin',Adminroutes);
app.use('/user',userroutes)







const PORT=process.env.PORT 

app.listen(PORT,()=>{
    connectDB();
    console.log("server is running on port 3000",PORT);
})