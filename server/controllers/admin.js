import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/User.js";
import {cookieOptions} from "../utils/features.js";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";

// Admin Login
const adminLogin = TryCatch(async (req, res,next) => {
  // console.log(secretKey);
  const {secretKey} = req.body;
   const isMatched = secretKey ===adminSecretKey;
  if(!isMatched){
    return next(new ErrorHandler("Invalid Admin Key",401));
  }
 
   const token = jwt.sign(secretKey,process.env.JWT_SECRET);
   return res.status(200).cookie("Chat_admin_token",token,{...cookieOptions,maxAge : 1000*60*15}).json({
    success:true, 
    message:"Authenticated Successfully , Welcome Admin",
   });
})
// Admin Logout
const adminLogOut = TryCatch(async (req, res,next) => {

  return res.status(200).cookie("Chat_admin_token","",{...cookieOptions,maxAge : 0}).json({
   success:true, 
   message:"LogOut Successfully , Thank You Admin",
  });
})
// Verify Admin
const VerifyAdmin = TryCatch(async (req,res,next) =>{
    return res.status(200).json({
      admin:true,
      message:"Admin verifed Thank You"
    })
})

// get all users
const getAllUsers = TryCatch(async (req, res) => {
  const users = await User.find({});
  const transformedUsers = await Promise.all(
    users.map(async ({ name, username, avatar, id }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: id }),
        Chat.countDocuments({ groupChat: false, members: id }),
      ]);
      return {
        name,
        username,
        avatar: avatar.url,
        id,
        groups,
        friends,
      };
    })
  );
  return res.status(200).json({ success: true, users: transformedUsers });
});

// get all Chats
const allChats = TryCatch(async (req, res) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  const transformedChats = await Promise.all(
    chats.map(async ({ id, members, groupChat, creator }) => {
      const totalMessages = await Message.countDocuments({ chat: id });
      return {
        id,
        groupChat,
        avatar: members.slice(0, 3).map((member) => member.avatar.url),
        members: members.map(({ id, name, avatar }) => ({
          id: id,
          name,
          avatar: avatar.url,
        })),
        creator: {
          name: creator?.name || "None",
          avatar: creator?.avatar?.url || "",
        },
        totalmembers: members.length,
        totalMessages,
      };
    })
  );
  return res.status(200).json({ success: true, chats: transformedChats });
});

// all Messages
const allMessages = TryCatch(async (req, res) => {
  try {
    const messages = await Message.find({})
      .populate("sender", "name avatar")
      .populate("chat", "groupChat");

    const transformedMessages = messages
      .map((message) => {
        const { content, attachments, _id, sender, createdAt, chat } = message;

        if (!chat || !sender) {
          console.error("Chat or sender is not populated:", message);
          return null;
        }

        return {
          id: _id,
          attachments,
          content,
          createdAt,
          chat: chat._id,
          groupChat: chat.groupChat,
          sender: {
            id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url,
          },
        };
      })
      .filter((message) => message !== null);

    return res
      .status(200)
      .json({ success: true, messages: transformedMessages });
  } catch (error) {
    console.error("Error fetching or transforming messages:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});


// Get Dashboard Stats
const getDashboardStats = TryCatch(async (req, res) => {
  const [
    groupsCount,
    usersCount,
    messagesCount,
    totalChatsCount,
  ] = await Promise.all([
    Chat.countDocuments({ groupChat: true }),
    User.countDocuments({}),
    Message.countDocuments({}),
    Chat.countDocuments({}),
  ]);

  const today = new Date();
  const last7Days = new Date();
  last7Days.setDate(today.getDate() - 7);
  const last7DaysMessages = await Message.find({
    createdAt: { $gte: last7Days, $lt: today },
  }).select("createdAt");

  const messages = new Array(7).fill(0);
last7DaysMessages.forEach(messages=>{
  const indexApprox = (today.getTime()-messages.createdAt.getTime()/1000*60*60*24);
  const index = Math.floor(indexApprox);
  messages[6-index]++;
})
  const stats = {
    groupsCount,
    usersCount,
    messagesCount,
    totalChatsCount,
    messagesChart: messages,
  };
  return res.status(200).json({ success: true, messages: stats });
});



export { allChats, allMessages, getAllUsers, getDashboardStats,adminLogin,adminLogOut,VerifyAdmin};

