import {User} from "../models/user.js";
import { sendToken } from "../utils/features.js";

// Create a new user and store in data base and save in cookies
const newUser = async(req, res) => {    

    const  {name,username,password,bio}=req.body;
    console.log(req.body);
    const avatar={
        public_id:"saurav_ka_photo",
        url:"abcdef"
    }
    ;
 const user = await User.create({name,bio,username,password,avatar});

 sendToken(res,user,201,"User created successfully");
}

const login = (req, res) => {    
    res.send("Hello World");
}

export {login,newUser};
