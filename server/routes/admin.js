import express  from "express";
import { allChats, allMessages, getAllUsers } from "../controllers/admin.js";

const app = express.Router();


app.get("/")
app.post("/verify")
app.get("logout")
app.get("/users",getAllUsers)
app.get("/chats",allChats)
app.get("/messages",allMessages)
app.get("/stats")
export default app;