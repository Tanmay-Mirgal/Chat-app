import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const SignupController = async (req, res) => {
    try {
        const { username, password, fullName, confirmPassword, gender } = req.body;
        if (!username || !password || !fullName || !confirmPassword) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "This Username already exists" });
        }
        //hash password
        const hashedPassword = await bcryptjs.hash(password, 12);


        //profile picture
        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`


        //save user
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePicture: gender === "male" ? boyProfilePicture : girlProfilePicture

        });

        if (newUser) {
            await newUser.save();

            //jwt token
            const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
            //cookie
            res.cookie("token", token, {
                httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production",
                maxAge: 3600000
            });

        }

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePicture: newUser.profilePicture
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
}
export const LoginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const user = await User.findOne({ username });
        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch || !user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        if (isMatch && user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
            res.cookie("token", token, {
                httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production",
                maxAge: 3600000
            });
            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                profilePicture: user.profilePicture
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
}
export const LogoutController = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged Out Successfully"
         });
    } catch (error) {
        res.status(500).json({ message: "user is Not Logged In" });
        console.log(error);
    }
}