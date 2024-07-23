import express from "express";
import { acceptFriendRequest, getAllNotification, getMyFriends, getMyProfile, login, logout, newUser, searchUser, sendFriendRequest } from "../controllers/user.js";
import { acceptFreindRequestValidator, loginValidator, registerValidator, sendFreindRequestValidator, validateHandler } from "../lib/validators.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleAvatar } from "../middlewares/multer.js";


const app = express.Router();


app.post("/new",singleAvatar, registerValidator(),validateHandler,newUser)
app.post("/login",loginValidator(),validateHandler,login)



// Routes  after the user logged in 


app.use(isAuthenticated);
app.get("/me",getMyProfile)
app.get("/logout",logout)

app.get("/search",searchUser)
app.put("/sendrequest",sendFreindRequestValidator(),validateHandler,sendFriendRequest);
app.put("/acceptrequest",acceptFreindRequestValidator(),validateHandler,acceptFriendRequest);
app.get("/notifications",getAllNotification)

app.get("/friends",getMyFriends)

export default app;