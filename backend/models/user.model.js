import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

},{timestamps: true});

const User = mongoose.model("User", UserSchema);

export default User;
