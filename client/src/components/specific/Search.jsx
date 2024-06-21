import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  List,
  ListItem,
} from "@mui/material";
import { useInputValidation } from "6pp";
import SearchIcon from "@mui/icons-material/Search";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";

const SearchDialog = () => {
  const search = useInputValidation("");
  const addFriendHandler = (id) =>{
console.log(id);
  }
 
  let isLoadingSendFriendRequest = false;
  const [users, setUsers] = useState(sampleUsers);
  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default SearchDialog;
