import { Box, Drawer, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from "@mui/icons-material";
import { matblack } from "../constants/color";
import { useNavigate } from "react-router-dom";
const Group = () => {
  
  const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false)
  const  navigate = useNavigate()
  const navigateBack =()=>{
   navigate("/")
  }
  const handleMobile=() =>{
    setIsMobileMenuOpen((prev)=>!prev);
  }
  const handleMobileClose=()=>setIsMobileMenuOpen(false);
  const IconsBtns = <>

   <Box sx={{
    display:{
      xs:"block",
      sm:"none",
      position:"fixed",
      right:"1rem",
      top:"1.5rem"
    }
   }}>
   <IconButton onClick={handleMobile} >
    <MenuIcon/>
   </IconButton>
   </Box>


  <Tooltip title="back">
   <IconButton sx={{
    position:"absolute",
    top:"2rem",
    left:"2rem",
    bgcolor:matblack,
    color:"white",
    ":hover":{
      bgcolor:"rgba(0,0,0,0.7)"
    }
   }}
   onClick={navigateBack}>
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
       <GroupList/>
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
      <Drawer sx={{
        display:{
          sx:"block",
          sm:"none"
        }
      }} open={isMobileMenuOpen} onClose={handleMobileClose}>
       <GroupList w={"50vw"}/>
      </Drawer>
    </Grid>
  );
};

const GroupList =({w="100%",myGroups=[],chatId}) =>(
  <Stack>
    {
      myGroups.length > 0? myGroups.map((group)=>{}) :
      (<Typography>
        No Groups
      </Typography>)
    }
  </Stack>
)

const GroupListItem =({group})=>{
  const {name,avatar,_id,chatId} = group;
}
export default Group;
