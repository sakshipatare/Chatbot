import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {userSchema} from "../features/user/user.schema.js"; // you're importing just the schema

// ✅ Create the model here
const User = mongoose.models.User || mongoose.model("User", userSchema);

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};
