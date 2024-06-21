import {
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import Button from "@mui/material/Button";
import { useInputValidation } from "6pp";
const NewGroupDialog = () => {
  const [] = useState([]);
  const selectMemberHandler = () => {};
  const groupName = useInputValidation("");
  const submitHandler = () => {

  }
  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle textAlign={"center"} varaint="h4">New group</DialogTitle>
        <TextField label="Group" value ={groupName.value} onChange={groupName.changeHandler}/>
        <Typography variant="body1">Members</Typography>
        <Stack>
          {sampleUsers.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
            />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button varaint="text" color="error">
            Decline
          </Button>
          <Button varaint="contained" onClick={submitHandler}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroupDialog;
