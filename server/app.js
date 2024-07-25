import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";
import { NEW_MESSAGE } from "./constants/events.js";
import { errorMiddleware } from "./middlewares/error.js";
import adminRoute from "./routes/admin.js";
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(cookieParser());
dotenv.config({ path: "./.env" });

const mongoURI = process.env.MONGO_URI;

const port = process.env.PORT || 3000;

const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "admin1234";

const userSocketId = new Map();
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


io.use((socket,next) => {
  
})
io.on("connection", (socket) => {
  const user = {
    id: "saukr",
    name: "Saurav",
  };
  userSocketId.set(user.id.toString(), socket.id.toString());
  console.log(userSocketId);

  socket.on(NEW_MESSAGE, async ({ chatId, members, messages }) => {
    // console.log(chatId,members,messages);
    const messageForRealTime = {
      content: messages,

      id: uuid(),

      sender: {
        id: user.id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    const messageForDB = {
      content: messages,
      sender: user.id,
      chat: chatId,
    };
    const memberSocket = getSockets(members)
    io.to(memberSocket).emit(NEW_MESSAGE,{chatId,messageForRealTime});
    io.to(memberSocket).emit(NEW_MESSAGE,{chatId});
   try {
    await Message.create(messageForDB);
   } catch (error) {
     console.log(error);
    
   }
    console.log("New Message", messageForRealTime);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
    userSocketId.delete(user.id.toString());
  });
});

app.use(errorMiddleware);
server.listen(port, () => {
  console.log(`Server is running on port ${port} in ${envMode} mode`);
});

export { adminSecretKey, envMode, userSocketId };
