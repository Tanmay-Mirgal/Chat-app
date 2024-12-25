import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectedRoute = async (req, res, next) => {
   try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isverified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(isverified);
    if (!isverified) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(isverified._id).select("-password");
    console.log(user);
  
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
   } catch (error) {
    res.status(500).json({ message: "Error in Protected Route" });
    console.log(error);
   }
}
