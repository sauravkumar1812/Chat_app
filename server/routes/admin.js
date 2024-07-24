import express  from "express";
import { adminLogin, adminLogOut, allChats, allMessages, getAllUsers, getDashboardStats, VerifyAdmin } from "../controllers/admin.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

// creating middleware for admin routes


app.post("/verify",adminLoginValidator(),validateHandler, adminLogin)
app.get("/logout",adminLogOut)


// only admin can access these routes
app.use(adminOnly)
app.get("/",VerifyAdmin)
app.get("/users",getAllUsers)
app.get("/chats",allChats)
app.get("/messages",allMessages)
app.get("/stats",getDashboardStats)
export default app;