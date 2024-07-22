import express from "express";
import {getMyProfile, login, newUser,logout, searchUser} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { registerValidator } from "../lib/validators.js";

const app = express.Router();


app.post("/new",singleAvatar, registerValidator,newUser)
app.post("/login", login)



// Routes  after the user logged in 


app.use(isAuthenticated);
app.get("/me",getMyProfile)
app.get("/logout",logout)


app.get("/search",searchUser)


export default app;