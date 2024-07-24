import { body, check, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

// Validate the request body
const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessages = errors
    .array()
    .map((err) => err.msg)
    .join(",");
  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};
// Register Validator
const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter Username").notEmpty(),
  body("bio", "Please Enter Bio").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
  
];

//   Login Validator
const loginValidator = () => [
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

//
const newGroupValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 2, max: 512 })
    .withMessage("Members must be 2-512"),
];

// Addnew Member Validator
const addNewMemberValidator = () => [
  body("ChatId", "Please Enter ChatId").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("members must be 1-97"),
];

// Remove Member Validator
const removeMemberValidator = () => [
  body("ChatId", "Please Enter ChatId").notEmpty(),
  body("UserId", "please Enter UserId").notEmpty(),
];

// LeaveGroup Member Validator
const leaveGroupValidator = () => [
  param("id", "Please Enter ChatId").notEmpty(),
];
// sendAttachments Member Validator
const sendAttachmentValidator = () => [
  body("Chatid", "Please Enter ChatId").notEmpty(),
 
];

//   getMessages Validator & getChatDetails validators & leave group validators & delete chat validators
const getMessagesValidator = () => [
  param("id", "Please Enter ChatId").notEmpty(),
];

// Rename Group Validator
const renameGroupValidator = () => [
  param("id", "Please Enter ChatId").notEmpty(),
  body("name", "Please Enter New Name").notEmpty(),
];

// sendFreindRequest Validator
const sendFreindRequestValidator = () => [
  body("userId", "Please Enter UserId").notEmpty(),
];
// acceptFreindRequest Validator
const acceptFreindRequestValidator = () => [
  body("requestId", "Please Enter RequestId").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please Add Accept")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
];

// Admin Login Validator

const adminLoginValidator = () => [
  body("secretKey", "Please Enter Secret Key").notEmpty(),
];
export {
  addNewMemberValidator,
  getMessagesValidator,
  leaveGroupValidator,
  loginValidator,
  newGroupValidator,
  registerValidator,
  removeMemberValidator,
  sendAttachmentValidator,
  validateHandler,
  renameGroupValidator,
  sendFreindRequestValidator,
  acceptFreindRequestValidator,
  adminLoginValidator,
};
