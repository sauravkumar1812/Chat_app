import React from "react";
import { Stack } from "@mui/material";
import ChatItem from "../shared/ChatItem";
const ChatList = ({
  width = "100%",
  chats = [],
  chatId,
  onlineusers = [],
  newmessagesAlert = [
    {
      chatId: "1",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack width={width} direction={"column"}>
      {chats?.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;
        const newMessageAlert = newmessagesAlert.find(
          ({ chatId }) => alert.chatId === _id
        );
        const isOnline = members?.some((member) => onlineusers.includes(_id));
        return (
          <ChatItem
          index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChatOpen={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
