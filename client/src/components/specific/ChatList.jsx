import React from 'react'
import { Stack } from '@mui/material';
import ChatItem from '../shared/ChatItem';
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
  ],handleDeleteChat,
}) => {
  return <Stack width={width} direction={"column"}>
    {
        chats?.map((data)=>{
            return <ChatItem/>;
        })
    }
  </Stack>;
};


export default ChatList;