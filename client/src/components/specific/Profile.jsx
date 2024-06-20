import { Stack,Avatar } from "@mui/material";
import React from "react";

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
        <Avatar 
        sx={{
            width:200,
            height:200,
            ObjectFit:"contain",
            marginBottom:"1rem",
            border:"5px solid white"
        }}
        />
      <ProfileCard />
    </Stack>
  );
};
const ProfileCard = () => <div>ProfileCard</div>;

export default Profile;
