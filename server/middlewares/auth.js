import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import("dotenv").config;
const  isAuthenticated  =TryCatch(async (req, res, next) => {

    const token  = req.cookies["Chat-app-token"];
   
    if(!token){
        return next(new ErrorHandler("Not authorized to access this route",401))
    }
    // verify the token
  
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = decodedData.id;
   
    next();
});

export {isAuthenticated};