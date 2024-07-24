import express  from "express";
import { adminLogin, adminLogOut, allChats, allMessages, getAllUsers, getDashboardStats } from "../controllers/admin.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();


app.get("/")
app.post("/verify",adminLoginValidator(),validateHandler, adminLogin)
app.get("logout",adminLogOut)
app.get("/users",getAllUsers)
app.get("/chats",allChats)
app.get("/messages",allMessages)
app.get("/stats",getDashboardStats)
export default app;