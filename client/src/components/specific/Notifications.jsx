import React, { memo } from "react";
import {
  Dialog,
  DialogTitle,
  Stack,
  ListItem,
  Typography,
  Avatar,
} from "@mui/material";
import Button from "@mui/material/Button";
import { sampleNotifications } from "../../constants/sampleData";
const NotificationDialog = () => {

  const friendRequesthandler = ({_id,accept})=>{

  }
  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {sampleNotifications.length > 0 ? (
          sampleNotifications.map((i) => (
            <NotificationsItem
              sender={i.sender}
              _id={i._id}
              handler={friendRequesthandler}
              key={i._id}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>0 Notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};
const NotificationsItem = memo(({sender,_id,handler})=>{
  const {name,avatar} = sender;
  return (
    <ListItem>
  <Stack
    direction={"row"}
    spacing={"1rem"}
    alignItems={"center"}
    width={"100%"}
  >
    <Avatar />
    <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
      {`${name} sent you a friend request`}
    </Typography>
    <Stack direction={{
      xs:"column",
      sm:"row"
    }}>
      <Button onClick={()=>handler({_id,accept:true})}>Accept</Button>
      <Button  sx={{ color: "red" }} onClick={()=>handler({_id,accept:false})}>Decline</Button>
    </Stack>
  </Stack>
</ListItem>
  )
})
export default NotificationDialog;
