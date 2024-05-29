import React from 'react'
import  {Box,AppBar,Toolbar,Typography, IconButton} from '@mui/material'
 import { orange } from '../../constants/color'
 import { Menu as MenuIcon} from "@mui/icons-material"
const Header = () => {
    const handleMobile = () => {
        console.log("Mobile");
    }
  return (
   <>
   <Box sx={{flexGrow:1}} height={"4rem"}>
    <AppBar position='static' sx = {{
        bgcolor:orange
    }}>
 <Toolbar>
     <Typography variant='h6' sx= {{
        display:{xs:"none" ,sm:"block"}
     }}>
        Chat Hub
     </Typography>
     <Box sx={{
        display:{xs:"block",sm:"none"},
    }}>
        <IconButton colot="inherit" onClick={handleMobile}>

            <MenuIcon/>
        </IconButton>
        </Box>
 </Toolbar>
    </AppBar>
   </Box>
   </>
  )
}

export default Header;