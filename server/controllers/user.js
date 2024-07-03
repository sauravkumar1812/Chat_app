// import { compare } from "bcrypt";
// import { User } from "../models/user.js";
// import { sendToken } from "../utils/features.js";

// // Create a new user and store in data base and save in cookies
// const newUser = async (req, res) => {
//   const { name, username, password, bio } = req.body;
//   console.log(req.body);

//   const avatar = {
//     public_id: "saurav_ka_photo",
//     url: "abcdef",
//   };
//   const user = await User.create({ name, bio, username, password, avatar });

//   sendToken(res, user, 201, "User created ");
// };

// const login =async (req, res) => {
//  const { username, password } = req.body;
//   const user = User.findOne({ username }).select("+password");

//   const isMatch = await compare(password, user.password);

//   if(!isMatch){
//     return res.status(401).json({message:"Invalid credentials"})
//   }
//   sendToken(res, user, 201,` Welcome Back , ${user.name}` );
// };

// export { login, newUser };
import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";

// Create a new user and store in database and save in cookies
const newUser = async (req, res) => {
  try {
    const { name, username, password, bio } = req.body;
    console.log(req.body);

    const avatar = {
      public_id: "saurav_ka_photo",
      url: "abcdef",
    };
    const user = await User.create({ name, bio, username, password, avatar });

    sendToken(res, user, 201, "User created");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res,next) => {
  const { username, password } = req.body;

  // Ensure we await the user query
  const user = await User.findOne({ username }).select("+password");

  // Check if the user exists
  if (!user) {
    return next(new Error("Invalid Username" ));
  }

  // Compare the provided password with the hashed password in the database
  const isMatch = await compare(password, user.password);

  // If passwords do not match
  if (!isMatch) {
    return next(new Error("Invalid Password" ));
}
  

  // If passwords match, send token
  sendToken(res, user, 200, `Welcome back, ${user.name}`);
};

const getMyProfile = async (req, res) => {};
export { login, newUser, getMyProfile };
