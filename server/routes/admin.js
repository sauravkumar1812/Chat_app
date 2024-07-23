import express  from "express";
import { getAllUsers } from "../controllers/admin.js";

const app = express.Router();


app.get("/")
app.post("/verify")
app.get("logout")
app.get("/users",getAllUsers)
app.get("/chats")
app.get("/messages")
app.get("/stats")
export default app;