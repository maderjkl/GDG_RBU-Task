import AdminModel from "../models/AdminModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../tokens/tokengenerate.js";
export const loginadmin = async (req, res) => {
    const { Username, Password } = req.body;        
try{
  
    const admin = await AdminModel.findOne({ Username });
    if (!admin) {   
        return res.status(404).json({ error: "Admin not found" });
    }

   
    const validPassword = await bcrypt.compare(Password, admin.Password);
    if (!validPassword) {
        return res.status(400).json({ error: "Wrong password" });
    }

  
    const token = await generateToken(admin, res);

  
    return res.status(200).json({ message: "Login successful", admin: admin, token: token });
}
catch(err){
    console.error('Login error:', err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
}
}

export const logoutadmin = async (req, res) => {
    try {
      // Clear cookies (such as token)
      res.clearCookie("token");
  
      // Clear local storage
      // This will clear all items in local storage
      // Alternatively, to remove only specific items:
      // localStorage.removeItem('authuser-chat');
      
      return res.status(200).json({ message: "Logout successful" , user: null, token: null });
    } catch (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: "Internal server error", details: err.message });
    }
  } 



  export const addadmin = async (req, res) => {
    const { Username, Password,fullname,userId } = req.body;        
    try{
      
        const admin = await AdminModel.findOne({ Username });
        if (admin) {   
            return res.status(404).json({ error: "Admin already exists" });
        }   
        const hashedPassword = await bcrypt.hash(Password, 10);
        const newadmin = new AdminModel({Username,Password:hashedPassword,fullname,userId});
        await newadmin.save();
        return res.status(200).json({ message: "Admin added successfully" });
    }
    catch(err){
        console.error('Login error:', err);
        return res.status(500).json({ error: "Internal server error", details: err.message });
    }
}