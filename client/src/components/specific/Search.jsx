import React from "react";
import { Dialog, DialogTitle, InputAdornment, Stack, TextField ,List, ListItem} from "@mui/material";
import { useInputValidation } from "6pp";
import SearchIcon from "@mui/icons-material/Search";

const SearchDialog = () => {
  const users = [1,2,3]
  const search = useInputValidation("");
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
            startAdornment:(
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
            )
          }}
        />
        <List>
         { users.map((user)=>{
        <ListItem>
          <ListItemtext/>
        </ListItem>
          })}
        </List>
      </Stack>
    </Dialog>
  );
};

export default SearchDialog;
