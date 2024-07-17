import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
import { ALERT } from "../constants/events.js";
import { REFETCH_CHATS } from "../constants/events.js";

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    return next(new ErrorHandler("Members must be more than 2", 400));
  }

  const allMembers = [...members, req.user];

  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });
  emitEvent(req, ALERT, allMembers, `welcome to ${name} group chat`);
  emitEvent(req, REFETCH_CHATS, members);

  return res.status(201).json({
    success: true,
    message: "Group  created successfully",
  });
});

const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "name username avatar"
  );

  return res.status(201).json({
    success: true,
    message: "Group  created successfully",
  });
});

export { newGroupChat, getMyChats };
