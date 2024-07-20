import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, getMyChats, getMyGroup, leaveGroup, newGroupChat, removeMember } from "../controllers/chat.js";

const app = express.Router();

app.use(isAuthenticated);


app.post("/new",newGroupChat)

app.get("/my",getMyChats)

app.get("/my/groups",getMyGroup)
app.put("/addmembers",addMembers)
app.put("/removemember",removeMember)

app.delete("/leave/:id",leaveGroup)
export default app;
