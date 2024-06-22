import { Grid, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { KeyboardBackspace as KeyboardBackspaceIcon } from "@mui/icons-material";
const Group = () => {
  const IconsBtns = <>
  <Tooltip title="back">
   <IconButton>
    <KeyboardBackspaceIcon  />
   </IconButton >
  </Tooltip>
  </>
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        bgcolor={"bisque"}
      >
        Group list
      </Grid>
      <Grid item xs={12}sm={8} sx={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        position:"relative",
        padding:"1rem 3rem"
      }}>
       {IconsBtns}
      </Grid>
    </Grid>
  );
};

export default Group;
