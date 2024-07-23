import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/Chat.js";
import { User } from "../models/User.js";

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

export { getAllUsers };
