import { TryCatch } from "./error.js";
import Jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
const  isAuthenticated  =TryCatch(async (req, res, next) => {

    const token  = req.cookies["Chat-app-token"];
    if(!token){
        return next(new ErrorHandler("Not authorized to access this route",401))
    }
    // verify the token

    const decodedData = Jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedData);
    req.user = decodedData.id;
    next();
});

export {isAuthenticated};