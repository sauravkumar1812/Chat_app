import { compare } from "bcrypt";
import { User } from "../models/User.js";
import { Chat } from "../models/Chat.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "../middlewares/error.js";

// Create a new user and store in database and save in cookies
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  console.log(req.body);

  const avatar = {
    public_id: "saurav_ka_photo",
    url: "abcdef",
  };
  const user = await User.create({ name, bio, username, password, avatar });

  sendToken(res, user, 201, "User created");
};

// Login user and save cookies use tryCatch as a middleware
const login = async (req, res) => {
  const { username, password } = req.body;

  // Ensure we await the user query
  const user = await User.findOne({ username }).select("+password");

  // Check if the user exists
  if (!user) {
    return next(new ErrorHandler("Invalid Username or password", 404));
  }

  // Compare the provided password with the hashed password in the database
  const isMatch = await compare(password, user.password);

  // If passwords do not match
  if (!isMatch) {
    return next(new ErrorHandler("Invalid Username or password", 404));
  }

  // If passwords match, send token
  sendToken(res, user, 200, `Welcome back, ${user.name}`);
};

// Get the profile of the logged in user
const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Logout user and clear cookies
const logout = TryCatch(async (req, res) => {
  res
    .status(200)
    .cookie("Chat-app-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

const searchUser = TryCatch(async (req, res) => {
  const { name } = req.query;
  const myChats = await Chat.find({
    groupChat: false,
    members: req.user,
  });

  //  All user from my chat means friends or people i have chated with
  const allUsersFromMyChats = myChats.map((chat) => chat.members).flat();

  //  for searching user except me and my friends using id and names
  const allUsersExceptMeAndFriends = await User.find({
    id: { $nin: allUsersFromMyChats },
    name: { $regex: name, $options: "i" },
  });

  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));
  res.status(200).json({
    success: true,
    users,
  });
});
export { login, newUser, getMyProfile, logout, searchUser };
