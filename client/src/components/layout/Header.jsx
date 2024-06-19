import React, { useState } from "react";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { orange } from "../../constants/color";
import { Menu as MenuIcon,Search as SearchIcon ,Add as AddIcon,Group as GroupIcon,Logout as LogoutIcon , Notfications as NotificationIcon} from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import {useNavigate} from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate();
    const [isMobile,setIsMobile] = useState(false);
    const [isSearch,setIsSearch] = useState(false);
    const [isNewGroup,setIsNewGroup] = useState(false);
    const [isNotification,setIsNotification] = useState(false);
  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };
  const openSearch = () => {
    setIsSearch((prev) => !prev);
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  
  const navigateToGroup = ( ) => navigate ("/groups");
const LogoutHandler= () =>{
  console.log("Logout")
}
const openNotification= () =>{
setIsNotification((prev) => !prev);
}

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Chat Hub
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none " },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 2,
              }}
            />
            <Box>
            <IconBtnn title={"search"}
            icon={<SearchIcon/>}
            onClick={openSearch}/>
            <IconBtnn title={"New group"}
            icon={<AddIcon/>}
            onClick={openNewGroup}/>
            <IconBtnn title={"Manage Group"}
            icon={<GroupIcon/>}
            onClick={navigateToGroup}/>
            <IconBtnn title={"Notifications"}
            icon={<NotificationsIcon/>}
            onClick={openNotification}/>
            <IconBtnn title={"Logout"}
            icon={<LogoutIcon/>}
            onClick={LogoutHandler}/>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

const IconBtnn = ({title,icon,onclick}) => {
   return (
    <Tooltip title={title}>
    <IconButton color="inherit" size="large" onClick={onclick}>
      {icon}
    </IconButton>
    </Tooltip>
   )
}
export default Header;
