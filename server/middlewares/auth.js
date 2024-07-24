import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";
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

// admin middleware
const  adminOnly  =TryCatch(async (req, res, next) => {

    const token  = req.cookies["Chat_admin_token"];
   
    if(!token){
        return next(new ErrorHandler("Only admin can access this route",401))
    }
    // verify the token
  
    const adminId = jwt.verify(token, process.env.JWT_SECRET);
  
    
   const isMatched = adminId === adminSecretKey;
 
   if(!isMatched) {
    return next(new ErrorHandler("Only admin can access this route",401))
   }
    next();
});
export {isAuthenticated,adminOnly};