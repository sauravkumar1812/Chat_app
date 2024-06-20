import React from "react";
import { Link,Typography} from "../styles/styledComponents";
import { Stack } from "@mui/material";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnlinne,
  newMessage,
  index = 0,
  handleDeleteChatOpen,
}) => {
  return (
    <Link to={`/chat/${_id}`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
        }}
      >
        <Stack>
            <Typography></Typography>
        </Stack>
      </div>
    </Link>
  );
};

export default ChatItem;
