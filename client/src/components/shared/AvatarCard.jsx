import React from "react";
import { Avatar, AvatarGroup } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const AvatarCard = ({ avatar = [] }, max = 4) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <AvatarGroup max={max}>
        <Box width={"5rem"} height={"5rem"}>
          {avatar.map((src, index) => (
            <Avatar
              key={Math.random()*100}
              src={src}
              alt={`Avatar ${index}`}
              sx={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                left: {
                  xs: `${0.5 + index}rem`,
                  sm: `${index}rem`,
                },
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
