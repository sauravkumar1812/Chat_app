import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import chatRoute from './routes/chat.js';
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import adminRoute from "./routes/admin.js";

const app = express();

app.use(express.json());

app.use(cookieParser());
dotenv.config({ path: "./.env" });

const mongoURI = process.env.MONGO_URI;

const port = process.env.PORT || 3000;

const envMode = process.env.NODE_ENV.trim() ||"PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY||"admin1234";
connectDB(mongoURI);

// createMesagesInChat("669a6a6782f92d78acb8a46b",50)

// createGroupChats(10);
// createUser(10);
app.use("/user", userRoute);
app.use("/chat", chatRoute); 
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Hello Saurav");
});

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${envMode} mode`);
});

export {adminSecretKey,envMode};