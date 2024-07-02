// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";

//  const cookieOptions = {
//   maxAge: 15 * 24 * 60 * 60 * 1000,
//   sameSite: "none",
//   httpOnly: true,
//   secure: true,
// };

// const connectDB = (uri) => {
//   mongoose
//     .connect(uri, { dbName: "chat-app" })
//     .then((data) =>
//       console.log(`Database connected on :${data.connection.host}`)
//     )
//     .catch((err) => console.log(err));
// };

// const sendToken = (res, user, code, message) => {
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   return res.status(code).cookie("Chat-app-token", token, cookieOptions).json({
//     success: true,
//     message,
//   });
// };

// export { connectDB, sendToken, cookieOptions};

import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "chat-app" })
    .then((data) => console.log(`Database connected on: ${data.connection.host}`))
    .catch((err) => console.log(err));
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);


  return res
    .status(code)
    .cookie("Chat-app-token", token, cookieOptions)
    .json({
      success: true,
      message,
    });
};

// Export functions
export { connectDB, sendToken, cookieOptions };