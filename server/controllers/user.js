import {User} from "../models/user.js";
import { sendToken } from "../utils/features.js";
// Create a new user and store in data base and save in cookies
const newUser = async(req, res) => {    

    const User = {name,username,password,bio}=req.body;
    console.log(req.body);
    const avatar={
        public_id:"saurav_ka_photo",
        url:"abcdef"
    }
    ;
  await User.create({name,bio,username,password,avatar});

    sendToken(res,User,200,"User Created")
}

const login = (req, res) => {    
    res.send("Hello World");
}

export {login,newUser};