const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

exports.auth = async (req, res, next) => {
  try {
    
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("authorization")?.replace("Bearer ", "");
  

    console.log("Extracted Token:", token);

    
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);
      req.user = decoded;
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ success: false, message: "Token is invalid" });
    }
    
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ success: false, message: "Something went wrong while validating the token" });
  }
};