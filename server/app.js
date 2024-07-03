import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import userRoute from "./routes/user.js";
import chatRoute from './routes/chat.js';

const app = express();

app.use(express.json());

app.use(cookieParser());
dotenv.config({ path: "./.env" });

const mongoURI = process.env.MONGO_URI;

const port = process.env.PORT || 3000;
connectDB(mongoURI);

app.use("/user", userRoute);
app.use("/chat", chatRoute); 


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
