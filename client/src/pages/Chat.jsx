import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Stack } from '@mui/material';
import { grayColor } from '../constants/color';
import { useRef } from 'react';
import {IconButton} from '@mui/material';
import { AttachFile as AttachFileIcon } from '@mui/icons-material';
const Chat = () => {
  const containerRef = useRef(null);
  return (
    <>
    <Stack ref={containerRef}
    
    boxSizing={"border-box"}
    padding={"1rem"}
    spacing={"1rem"}
    bgcolor={grayColor}
    height={"90%"}
    sx={{
      overflowX:"hidden",
      overflowY:"auto",
    }}>


</Stack>
  <form style={{
    height:"10%"
  }}>
    <Stack>
      <IconButton>
           <AttachFileIcon />
      </IconButton>
    </Stack>
  </form>
    </>
  )
}

export default AppLayout()(Chat);