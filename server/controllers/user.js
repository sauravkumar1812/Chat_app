import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";

// Create a new user and store in data base and save in cookies
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  console.log(req.body);
 
  const avatar = {
    public_id: "saurav_ka_photo",
    url: "abcdef",
  };
  const user = await User.create({ name, bio, username, password, avatar });

  sendToken(res, user, 201, "User created ");
};

const login =async (req, res) => {
 const { username, password } = req.body;
  const user = User.findOne({ username }).select("+password"); 
  
  const isMatch = await compare(password, user.password);

  if(!isMatch){
    return res.status(401).json({message:"Invalid credentials"})
  }
  sendToken(res, user, 201, `Welcome Back , ${user.name}` );
};

export { login, newUser };

