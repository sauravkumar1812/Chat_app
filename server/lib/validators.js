import { body, validationResult,check } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";


// Validate the request body
const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessages = errors.array().map((err) => err.msg).join(",")
  if (errors.isEmpty())  return next();
  else next(new ErrorHandler(errorMessages,400))
  
};
// Register Validator
const registerValidator = () => [
    body("name","Please Enter Name").notEmpty(),
    body("username","Please Enter Username").notEmpty(),
    body("bio","Please Enter Bio").notEmpty(),
    body("password","Please Enter Password").notEmpty(),
    check("avatar","Please Upload Avatar").notEmpty(),
  ];

//   Login Validator
const loginValidator = () => [
    body("username","Please Enter Username").notEmpty(),
    body("password","Please Enter Password").notEmpty(),
  ];

//   
const profileValidator = () => [
    body("name","Please Enter Name").notEmpty(),
    body("username","Please Enter Username").notEmpty(),
    body("bio","Please Enter Bio").notEmpty(),
    body("password","Please Enter Password").notEmpty(),
    check("avatar","Please Upload Avatar").notEmpty(),
  ];


    export { registerValidator, validateHandler,loginValidator,profileValidator };

