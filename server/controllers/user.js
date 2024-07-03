import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";
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
const login = TryCatch(async (req, res) => {
  async (req, res, next) => {
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
});
const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);
    if(!user){
        return next(new ErrorHandler("User not found",404))
    }
  res.status(200).json({
    success: true,
    user,
  });
});
export { login, newUser, getMyProfile };
