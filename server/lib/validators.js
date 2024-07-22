import { body, validationResult } from "express-validator";
const registerValidator = () => [
  body("name","Please Enter Name").notEmpty(),
  body("username","Please Enter Username").notEmpty(),
  body("bio","Please Enter Bio").notEmpty(),
  body("password","Please Enter Password").notEmpty(),
];
const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg)
    console.log(errorMessages);
    return res.status(400).json({ errors: errorMessages });
  }
   next();
};
export { registerValidator, validateHandler };

