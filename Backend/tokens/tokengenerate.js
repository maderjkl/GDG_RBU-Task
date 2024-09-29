import jwt from "jsonwebtoken";

export const generateToken = (user, res) => {
  try {
  
    // Generate token using the user's ID and username
    const token = jwt.sign(
      { userId: user._id, username: user.Username },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d", // Token will expire in 30 days
      }
    );

    // Set the token as a cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks by disallowing cross-site requests
      maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiry set to 30 days
    });

    return token; // Optionally return the token if needed
  } catch (err) {
    console.log(err);
    return null; // Return null in case of an error
  }
};
