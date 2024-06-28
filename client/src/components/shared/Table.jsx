import { Container, Paper, Typography } from '@mui/material'
import React from 'react'
import Datagrid from "@mui/x-data-grid"
import { matblack } from '../../constants/color'
const Table = ({rows,column,heading,rowHeight = 52}) => {
  return (<Container sx={{
    height:"100vh",
  }}>
 <Paper
 elevation={3}  
    sx={{
        padding:"2rem",
        borderRadius:"1rem",
       margin:"auto",
       width:"100%",
       overflow:"hidden"   ,
       height:"100%",
       boxShadow:"none"
    }}  
 
 
 >
    <Typography
    textAlign={"center"} 
    variant='h4'
    sx={{
        margin:"2rem",
        textTransform:"uppercase"
    }}
    
    >{heading}</Typography>
    <Datagrid
      rows={rows}
      columns={column}
      rowHeight={rowHeight}
      style={{ height: "80%"}}

      sx={{
        border:"none",
        ".table-header": {
            bgcolor:matblack,
            color:"white",  
        }
      }}
    />
 </Paper>
  </Container>)
}

export default Table