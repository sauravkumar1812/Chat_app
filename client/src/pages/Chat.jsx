import React, { Fragment } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Stack ,IconButton} from "@mui/material";
import { grayColor } from "../constants/color";
import { useRef } from "react";

import {
  AttachFile as AttachFileIcon,
  Send as SendIcon
} from "@mui/icons-material";
import { InputBox } from "../components/styles/styledComponents";
import { orange } from "../constants/color";
import FileMenu from "../components/dialogs/FileMenu";


const Chat = () => {
  const containerRef = useRef(null);

  return (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      ></Stack>
      <form
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          width={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton sx={{
            position:"absolute",
            left:"1.5rem",
            rotate:"30deg"
          }}
         
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox  placeholder="Type your messages here....." />
          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />

    </Fragment>
  );
};

export default AppLayout()(Chat);
