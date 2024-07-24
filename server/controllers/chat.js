import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/User.js";
import { Message } from "../models/message.js";
import { deleteFilesFromCloudinary, emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { createGroupChats, createSingleChats,createMessages,createMesagesInChat } from "../seeders/chat.js";


// createSingleChats(10);
// createGroupChats(10);
// createMessages(10);
// createMesagesInChat(10)

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
  const { userId, chatId } = req.body;
  const [chat, userThatWillBeRemoved] = await Promise.all([
    Chat.findById(chatId),
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

  if (chat.members.length < 3) {
    return next(new ErrorHandler("Group must have 3 members", 400));
  }

  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );

  await chat.save();
  emitEvent(
    req,
    ALERT,
    chat.members,
    `${userThatWillBeRemoved.name} has been removed from the group`
  );
  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Members Removed Successfully",
  });
});

// Leave a group chat
const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);

  // if not chat
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }
  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.user.toString()
  );
  if (remainingMembers.length < 3) {
    return next(new ErrorHandler("Group must have 3 members", 400));
  }
  if (chat.creator.toString() === req.user.toString()) {
    const randomNumber = Math.floor(Math.random() * remainingMembers.length);
    const newCreator = remainingMembers[randomNumber];
    chat.creator = newCreator;
  }
  chat.members = remainingMembers;
  const user = await Promise.all([
    User.findById(req.user, "name"),
    await chat.save(),
  ]);

  emitEvent(req, ALERT, chat.members, `User ${user.name} has left the group`);

  return res.status(200).json({
    success: true,
    message: "Members Removed Successfully",
  });
});

// Send Attachment file
const sendAttachments = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;
  const [chat, me] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user, "name"),
  ]);

  const files = req.files || [];
  if (!chat) {
    return next(new ErrorHandler("Chat  not found", 404));
  }

  if (files.length < 1) {
    return next(new ErrorHandler("please select a file to sent", 400));
  }
  // upload files here
  const attachments = [];

  const messageForDB = {
    content: "",
    attachments,
    sender: me._id,
    chat: chatId,
  };

  const messageForRealTime = {
    ...messageForDB,
    sender: { _id: me._id, name: me.name, avatar: me.avatar },
  };
  const message = await Message.create(messageForDB);
  emitEvent(req, NEW_ATTACHMENT, chat.members, {
    message: messageForRealTime,
    chatId,
  });
  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });
  return res.status(200).json({
    success: true,
    message,
  });
});

// Get Chat Details

const getChatDetails = TryCatch(async (req, res, next) => {
  if (req.query.populate === "true") {
    const chat = await Chat.findById(req.params.id)
      .populate("members", "name avatar")
      .lean();
    if (!chat) {
      return next(new ErrorHandler("Chat not found", 404));
    }
    chat.members = chat.members.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));
    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return next(new ErrorHandler("Chat not found", 404));
    }
    return res.status(200).json({
      success: true,
      chat,
    });
  }
});

// Rename Group Chat
const renameGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const { name } = req.body;
  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));
  if (chat.creator.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not allowed to rename the group", 403)
    );

  chat.name = name;
  await chat.save();
  emitEvent(req, REFETCH_CHATS, chat.members, `Group name changed to ${name}`);

  return res.status(200).json({
    success: true,
    message: "Group Name Changed Seccessfully",
  });
});

// Delete a group chat
const deleteChat = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  const members = chat.members;
  if (chat.groupChat && chat.creator.toString() !== req.user.toString()) {
    return next(
      new ErrorHandler("You are not allowed to delete the group", 403)
    );
  }
  if (!chat.groupChat && !members.includes(req.user.toString())) {
    return next(
      new ErrorHandler("You are not allowed to delete the chat", 403)
    );
  }
  // Here we delete the chat
  const messagesWithAttachments = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  });

  const public_ids = [];

  messagesWithAttachments.forEach(({ attachments }) => {
    attachments.forEach(({ public_id }) => {
      public_ids.push(public_id);
    });
  });

  await Promise.all([
    deleteFilesFromCloudinary(public_ids),
    chat.deleteOne(),
    Message.deleteMany({ chat: chatId }),
  ]);

  emitEvent(req, REFETCH_CHATS, members);
  return res.status(200).json({
    success: true,
    message: "Chat deleted successfully",
  });
});

// Get Messages
const getMessages = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { page = 1 } = req.query;
  const limit = 20;

  const [messages, totalMessagesCount] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("sender", "name avatar")
      .lean(),
    Message.countDocuments({ chat: chatId }),
  ]);

  const totalPages = Math.ceil(totalMessagesCount / limit);
  return res.status(200).json({
    sucess: true,
    messages: messages.reverse(),
    totalPages,
  });
});

export {
  addMembers,
  getChatDetails,
  getMyChats,
  getMyGroup,
  leaveGroup,
  newGroupChat,
  removeMember,
  sendAttachments,
  renameGroup,
  deleteChat,
  getMessages,
};
