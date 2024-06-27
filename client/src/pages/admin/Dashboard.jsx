import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {  Box, Container, Paper, Stack, Typography } from "@mui/material";
import { AdminPanelSettings as AdminPanelSettingsIcon, Notifications as NotificationsIcon} from "@mui/icons-material";
import moment from 'moment'
import { CurveButton, SearchField } from "../../components/styles/styledComponents";


const Dashboard = () => {
    const Appbar = <Paper elevation={3} sx={{padding:"1.5rem" ,margin:"2rem 0", borderRadius:"1rem"}}>
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <AdminPanelSettingsIcon sx={{fontSize:"3rem"}}/>
         <SearchField placeholder="search"/>
            <CurveButton>
                Search
            </CurveButton>
            <Box flexGrow={1}/>
            <Typography display={{
                xs:"none",
                md:"block",
                
            }} color={"rgba(0,0,0,0.7)"}
            textAlign={"center"}
            >{moment().format("MMMM Do YYYY h:mm:ss a")}</Typography>
            <NotificationsIcon/>
        </Stack>
    </Paper>
  return <AdminLayout>
    <Container component={"main"}>
{
    Appbar
}
    </Container>
  </AdminLayout>
};

export default Dashboard;
