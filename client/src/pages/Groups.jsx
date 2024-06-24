import { Box, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon,Edit as EditIcon,Done as DoneIocn } from "@mui/icons-material";
import { matblack } from "../constants/color";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/styledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { samplechats } from "../constants/sampleData";
const Group = () => {
  const chatId =useSearchParams()[0].get("group");
  const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false)
  const  navigate = useNavigate()
  const [isEdit,setIsEdit] =useState(false);
  const [groupName,setGroupName] = useState("");
  const [groupNameUpdatedValue,setGroupNameUpdatedValue] = useState("")
  const navigateBack =()=>{
   navigate("/")
  }
  // console.log(chatId)
  const handleMobile=() =>{
    setIsMobileMenuOpen((prev)=>!prev);
  }
  const updateGroupName=()=>{
    setIsEdit(false);
    console.log(groupNameUpdatedValue)
  }
  useEffect(()=>{
    setGroupName("Group Name");
    setGroupNameUpdatedValue("Group Name")
  },[])
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
  const GroupName=<Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}>
    {
      isEdit?<>
      <TextField value={groupNameUpdatedValue} onChange={(e)=>setGroupNameUpdatedValue(e.target.value)}/>
      <IconButton onClick={updateGroupName}>
        <DoneIocn/>
      </IconButton>
        </>:<>
      <Typography variant="h4">
        {groupName}
        </Typography>
        <IconButton onClick={()=>setIsEdit(true)}><EditIcon/></IconButton>
        </>
    }
  </Stack>
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
       <GroupList myGroups={samplechats} chatId={chatId}/>
      </Grid>
      <Grid item xs={12}sm={8} sx={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        position:"relative",
        padding:"1rem 3rem"
      }}>
       {IconsBtns}
       {
          groupName && GroupName
       }
      </Grid>
      <Drawer sx={{
        display:{
          sx:"block",
          sm:"none"
        }
      }} open={isMobileMenuOpen} onClose={handleMobileClose}>
       <GroupList w={"50vw"} myGroups={samplechats} chatId={chatId}/>
      </Drawer>
    </Grid>
  );
};

const GroupList =({w="100%",myGroups=[],chatId}) =>(
  <Stack width={w}>
    {
      myGroups.length > 0? myGroups.map((group)=><GroupListItem group={group} chatId ={chatId} key={group._id}/>) :
      (<Typography>
        No Groups
      </Typography>)
    }
  </Stack>
)

const GroupListItem =memo(({group,chatId})=>{
  const {name,avatar,_id} = group;
  return <Link to={`?group=${_id}`} onClick={e=>{
    if(chatId === _id) e.preventDefault()
  }}>
  <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
    <AvatarCard avatar={avatar}/>
    <Typography>
      {name}
    </Typography>
    </Stack>
    </Link>
});
export default Group;
