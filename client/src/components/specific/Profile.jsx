import { Stack,Avatar, Typography} from "@mui/material";
import { Face as FaceIcon ,AlternateEmail as UserNameIcon, CalendarMonth as CalendarIcon} from "@mui/icons-material";
import React from "react";
import moment from 'moment';

const Profile = () => {
    const customDate = '2023-12-31'; 
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
      <ProfileCard heading={"Bio"} text={"sjkcbdahvc djkbvahkdgbvdjbvdhbbv"}/>
      <ProfileCard heading={"username"} text={"s_s_rajput"} icon={<UserNameIcon/>}/>
      <ProfileCard heading={"Name"} text={"Saurav kumar"} icon={<FaceIcon/>}/>
      <ProfileCard heading={"Joined"} text={moment(customDate).fromNow()} icon={<CalendarIcon/>}/>
    </Stack>
  );
};
const ProfileCard = ({text,icon,heading}) => (
    <Stack 
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
    >
        {icon && icon}
        <Stack>
            <Typography variant="body1">{text}</Typography>
            <Typography color={"gray"} variant="caption">{heading}</Typography>
        </Stack>
    </Stack>
);

export default Profile;
