import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/User.js";

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
    chats.map(async ({  id, members, groupChat, creator }) => {
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
    const messages = await Message.find({})
    .populate("sender", "name avatar")
    .populate("chat", "groupChat");
 
    const transformedMessages = messages.map( ({ content, attachments, id, sender, createdAt, chat }) => ({
          id:id,
          attachments,
          content,
          createdAt,
          chat: chat.id,
          groupChat: chat.groupChat,
          sender: {
            id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url,
          },
        })
      );
 
  return res.status(200).json({ success: true, messages: transformedMessages });
});

export { getAllUsers, allChats, allMessages };
