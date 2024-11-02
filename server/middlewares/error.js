import { envMode } from "../app.js";
const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;
  
  if(err.code === 11000){
    const error = Object.keys(err.keyPattern).join(",")
    err.message =`User validation failed: - ${error}`;
    err.statusCode = 400;
  }

  if(err.name === "CastError"){
    err.message = `Resource not found. Invalid: ${err.path}`;
    err.statusCode = 400;
  }
  return res.status(err.statusCode).json({
    success: false,
    message:envMode=== "DEVELOPMENT"?err: err.message,
  });
};
const TryCatch = (passedFunc)=>async (req, res, next) => {
    try {
      await passedFunc(req, res, next)
    } catch (error) {
      next(error);
    }
  };

export { errorMiddleware,TryCatch };
