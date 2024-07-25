// import { userSocketId } from "../app";

export const getOtherMember = (members, userId) => {
  return members.find((member) => member._id.toString() !== userId.toString());
};

export const getSockets = (users) => {
  return users.map((user) => 
    userSocketId.get(user.id.toString()));
};
