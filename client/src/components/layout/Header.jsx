import React from "react";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { orange } from "../../constants/color";
import { Menu as MenuIcon,Search as SearchIcon ,Add as AddIcon} from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
const Header = () => {
  const handleMobile = () => {
    console.log("Mobile");
  };
  const openSearchDialog = () => {
    console.log("openSearchDialog");
  };
  const openNewGroup = () => {
    console.log("openNewGroup");
  };
  
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
              <IconButton colot="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 2,
              }}
            />
            <Box>
            <IconButton colot="inherit" size="large" onClick={openSearchDialog}>
                <SearchIcon />
              </IconButton>
              <Tooltip title="New group">
              <IconButton colot="inherit" size="large" onClick={openNewGroup}>
                <AddIcon />
              </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
