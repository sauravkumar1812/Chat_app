import {
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
const NewGroupDialog = () => {
  const selectMemberHandler = () => {};
  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>New group</DialogTitle>
        <TextField />
        <Typography>Members</Typography>
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
          <Button varaint="text" color="error">
            Decline
          </Button>
          <Button varaint="contained">Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroupDialog;
