import User from "../models/user.model.js";

export const getAllUsersforSideBar = async (req, res) => {
    try {
        const LoggedInUser = req.user._id;

        const allUsers = await User.find({_id:{$ne:LoggedInUser}}).select("-password");
        return res.status(200).json(allUsers);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};