import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/Chat.js";
import { User } from "../models/User.js";
import { emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

// Cretae a new group chat
const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;
  console.log(name, members);
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

// Get all my chats
const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "name  avatar"
  );

  const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    const otherMembers = getOtherMember(members, req.user);
    return {
      _id,
      groupChat,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMembers.avatar.url],
      name: groupChat ? name : otherMembers.name,
      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.user.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });
  return res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

// Get all my group chats
const getMyGroup = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "name avatar");

  const groups = chats.map(({ members, _id, name, groupChat }) => ({
    _id,
    groupChat,
    name,
    avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
  }));
  return res.status(200).json({
    success: true,
    groups,
  });
});

// Add New Members to a group chat
const addMembers = TryCatch(async (req, res, next) => {
  const { members, chatId } = req.body;
  if (!members || members.length < 1) {
    return next(
      new ErrorHandler("Please select atleast one members to add", 400)
    );
  }
  const chat = await Chat.findById(chatId);
  // if not chat
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  // if not group chat
  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }
  // if not creator then not allowed to add someone
  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("You are not allowed to add members", 400));
  }
  const allNewMembersPromise = members.map((i) => User.findById(i, "name"));

  const allNewMembers = await Promise.all(allNewMembersPromise);

  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id);
  chat.members.push(...uniqueMembers);

  if (chat.members.length > 256) {
    return next(new ErrorHandler("Members limit exceeded", 400));
  }
  await chat.save();

  const allUserName = allNewMembers.map((i) => i.name).join(",");

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${allUserName} added to the ${chat.name} group`
  );
  emitEvent(req, REFETCH_CHATS, chat.members);
  return res.status(200).json({
    success: true,
    message: "Members added successfully",
  });
});

// Remove Members from a group chat
const removeMember = TryCatch(async (req, res, next) => {
  const [userId, chatId] = req.body;
  const [chat, userThatWillBeRemoved] = await Promise.all([
    chat.findById(chatId),
    User.findById(userId, "name"),
  ]);
  // if not chat
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  // if not group chat
  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }
  // if not creator then not allowed to add someone
  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("You are not allowed to add members", 400));
  }

  if(chat.members,length < 3){
    return next(new ErrorHandler("Group must have 3 members",400))
  }

  chat.members = chat.members.filter((member) =>member.toString() !== userId.toString())

  await chat.save();
  emitEvent(req,AlERT,chat.members,`${userThatWillBeRemoved.name} has been removed from the group`);
  emitEvent(req,REFETCH_CHATS,chat.members);

  return res.status(200).json({
    success:true,
    message:"Members Removed Successfully",
  })
});

const leaveGroup = TryCatch(async (req, res, next) => {
  const [userId, chatId] = req.body;
  const [chat, userThatWillBeRemoved] = await Promise.all([
    chat.findById(chatId),
    User.findById(userId, "name"),
  ]);
  // if not chat
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  // if not group chat
  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }
  // if not creator then not allowed to add someone
  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("You are not allowed to add members", 400));
  }

  if(chat.members,length < 3){
    return next(new ErrorHandler("Group must have 3 members",400))
  }

  chat.members = chat.members.filter((member) =>member.toString() !== userId.toString())

  await chat.save();
  emitEvent(req,AlERT,chat.members,`${userThatWillBeRemoved.name} has been removed from the group`);
  emitEvent(req,REFETCH_CHATS,chat.members);

  return res.status(200).json({
    success:true,
    message:"Members Removed Successfully",
  })
});
export { addMembers, getMyChats, getMyGroup, newGroupChat, removeMember,leaveGroup };
