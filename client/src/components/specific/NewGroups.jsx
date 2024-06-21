import React from 'react'
import React, { memo } from "react";
import {
  Dialog,
  DialogTitle,
  Stack,
  ListItem,
  Typography,
  Avatar,
} from "@mui/material";
import {users} from "../../constants/sampleData"
const NewGroupDialog = () => {
  return (
    <Dialog open>
    <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
      <DialogTitle>New group</DialogTitle>
     <Stack>
     {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
     </Stack>
    </Stack>
  </Dialog>
  )
}

export default NewGroupDialog