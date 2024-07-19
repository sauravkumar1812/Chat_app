import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, getMyChats, getMyGroup, newGroupChat } from "../controllers/chat.js";

const app = express.Router();

app.use(isAuthenticated);


app.post("/new",newGroupChat)

app.get("/my",getMyChats)

app.get("/my/groups",getMyGroup)
app.put("/addmembers",addMembers)
export default app;
