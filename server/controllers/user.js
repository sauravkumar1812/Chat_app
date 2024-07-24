import { compare } from "bcrypt";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/Request.js";
import { User } from "../models/User.js";
import { cookieOptions, emitEvent, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { getOtherMember } from "../lib/helper.js";
import { createUser } from "../seeders/user.js";



// Create a new user and store in database and save in cookies
const newUser = async (req, res, next) => {
  const { name, username, password, bio } = req.body;
  console.log(req.body);

  const avatar = {
    public_id: "saurav_ka_photo",
    url: "abcdef",
  };
  const user = await User.create({ name, bio, username, password, avatar });

  sendToken(res, user, 201, "User created");
};

// Login user and save cookies use tryCatch as a middleware
const login = async (req, res, next) => {
  const { username, password } = req.body;

  // Ensure we await the user query
  const user = await User.findOne({ username }).select("+password");

  // Check if the user exists
  if (!user) {
    return next(new ErrorHandler("Invalid Username or password", 404));
  }

  // Compare the provided password with the hashed password in the database
  const isMatch = await compare(password, user.password);

  // If passwords do not match
  if (!isMatch) {
    return next(new ErrorHandler("Invalid Username or password", 404));
  }

  // If passwords match, send token
  sendToken(res, user, 200, `Welcome back, ${user.name}`);
};

// Get the profile of the logged in user
const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Logout user and clear cookies
const logout = TryCatch(async (req, res) => {
  res
    .status(200)
    .cookie("Chat-app-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

// Search for a user
const searchUser = TryCatch(async (req, res) => {
  const { name } = req.query;
  // finding all my chats
  const myChats = await Chat.find({
    groupChat: false,
    members: req.user,
  });

  //  All user from my chat means friends or people i have chated with
  const allUsersFromMyChats = myChats.map((chat) => chat.members).flat();

  //  for searching user except me and my friends using id and names
  const allUsersExceptMeAndFriends = await User.find({
    id: { $nin: allUsersFromMyChats },
    name: { $regex: name, $options: "i" },
  });

  // modify the response
  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));
  res.status(200).json({
    success: true,
    users,
  });
});

// Send friend request
const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;
  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });
  if (request) {
    return next(new ErrorHandler("Request already sent", 400));
  }
  await Request.create({
    sender: req.user,
    receiver: userId,
  });
  emitEvent(userId, NEW_REQUEST, [userId]);

  return res.status(200).json({
    success: true,
    message: "Friend Request Sent",
  });
});

const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;
  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  // console.log(request);
  if (!request) {
    return next(new ErrorHandler("Request not found", 404));
  }
  if (!request.receiver) {
    return next(new ErrorHandler("Receiver not found in the request", 404));
  }
  if (request.receiver._id.toString() !== req.user.toString()) {
    return next(
      new ErrorHandler("You are not authorized to accept this request", 401)
    );
  }

  if (!accept) {
    await request.deleteOne();
    return res.status(200).json({
      success: true,
      message: `Friend Request from ${request.sender.name} rejected`,
    });
  }
  const members = [request.sender.id, request.receiver.id];
  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name} and ${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);
  emitEvent(req, REFETCH_CHATS, members);
  return res.status(200).json({
    success: true,
    message: `Friend Request from ${request.sender.name} accepted`,
    senderId: request.sender._id,
  });
});

// Get all notifications
const getAllNotification = TryCatch(async (req, res) => {
  const requests = await Request.find({ receiver: req.user }).populate(
    "sender",
    "name avatar"
  );

  const allRequest = requests.map(({ id, sender }) => ({
    id,
    sender: {
      id: sender.id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }));
  res.status(200).json({
    success: true,
    allRequest,
  });
});

// get all my friends
const getMyFriends = TryCatch(async (req, res) => {
  const chatId = req.query.chatId;

  const chat = await Chat.find({
    groupChat: false,
    members: req.user,
  }).populate("members", "name avatar");

  const friends = chat.map(({ members }) => {
    const otherUser = getOtherMember(members, req.user);
    return {
      id: otherUser.id,
      name: otherUser.name,
      avatar: otherUser.avatar.url,
    };
  });

  if(chatId) {
     const chat = await Chat.findById(chatId);
     const availableFriends = friends.filter(friend => !chat.members.includes(friend.id));
     return res.status(200).json({
      success: true,
      friends: availableFriends,
     })
  }
  else{
    res.status(200).json({
      success: true,
      friends,
    });
  }
  res.status(200).json({
    success: true,
    allRequest,
  });
});

export {
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getAllNotification,
  getMyFriends,
};
