import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import userRoute from "./routes/user.js";
import chatRoute from './routes/chat.js';
import { createGroupChats, createMesagesInChat, createSingleChats,  } from "./seeders/chat.js";
import {createUser} from "./seeders/user.js";

const app = express();

app.use(express.json());

app.use(cookieParser());
dotenv.config({ path: "./.env" });

const mongoURI = process.env.MONGO_URI;

const port = process.env.PORT || 3000;
connectDB(mongoURI);

// createMesagesInChat("669a6a6782f92d78acb8a46b",50)

// createGroupChats(10);
// createUser(10);
app.use("/user", userRoute);
app.use("/chat", chatRoute); 


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
