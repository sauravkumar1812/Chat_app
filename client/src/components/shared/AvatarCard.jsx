import { Avatar, AvatarGroup, stackClasses } from "@mui/material";
import React from "react";

const AvatarCard = ({ avatar = [] }, max = 4) => {
  return (
    <stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={max}>
        <Box width={"5rem"} height={"5rem"}> 
        {avatar.map((src, index) => {
          <Avatar
            key={Math.random()*100}
            src={i}
            alt={`Avatar ${index}`}
            sx={{
              width: "3rem",
              height: "3rem",
              position:"absolute",
              left:{
                xs:`${0.5 +index}rem`,
                sm:`${index}rem`
              }
            }}
          />;
        })}
        </Box>
      </AvatarGroup>
    </stack>
  );
};

export default AvatarCard;
