import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const SignupController = async (req,res) =>{
    res.send("Signup Route");
}
export const LoginController = async (req,res) =>{
    res.send("Login Route");
}
export const LogoutController = async (req,res) =>{
    res.send("Logout Route");
}