import React from 'react'
import React, { memo } from "react";
import {
  Dialog,
  DialogTitle,
  Stack,
  ListItem,
  Typography,
  Avatar,
  TextField,
} from "@mui/material";
import {sampleUsers} from "../../constants/sampleData"
const NewGroupDialog = () => {
  const selectMemberHandler = () => {

  }
  return (
    <Dialog open>
    <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
      <DialogTitle>New group</DialogTitle>
      <TextField/>
      <Typography>
        Members
      </Typography>
     <Stack>
     {sampleUsers.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
            />
          ))}
     </Stack>
     <Stack direction={"row"}>
     <Button>Decline</Button>
     <Button>Create</Button>
     </Stack>
    </Stack>
  </Dialog>
  )
}

export default NewGroupDialog