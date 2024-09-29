import user from "../models/Usermodel.js";
import bcrypt from "bcrypt";
import { generateToken }from"../tokens/tokengenerate.js"



export const signup = async (req, res) => {
  try {
    const { fullname, Username, Password, gender, Confirmpassword } = req.body;

    // Check if passwords match
    if (Password !== Confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Set default profile picture based on gender
   
    // Check if user already exists
    const existingUser = await user.findOne({ Username });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create new user
    const newUser = new user({
      fullname,
      Username,
    
      Password: hashedPassword,
      gender,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Generate token
    const token = await generateToken(savedUser, res);

    // Send successful response
    return res.status(200).json({ message: "Signup successful", user: savedUser, token: token });

  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    
    // Check if user exists
    const user1 = await user.findOne({ Username });
    if (!user1) {
      return res.status(404).json({message: "User not found" });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(Password, user1.Password);
    if (!validPassword) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // Generate token
    const token = await generateToken(user1, res);

    // Send successful response
    return res.status(200).json({ message: "Login successful", user: user1, token: token });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
};


export const logout = async (req, res) => {
  try {
    // Clear cookies (such as token)
    res.clearCookie("token");

    // Clear local storage
    // This will clear all items in local storage
    // Alternatively, to remove only specific items:
    // localStorage.removeItem('authuser-chat');
    
    return res.status(200).json({ message: "Logout successful" , user: null, token: null});
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

