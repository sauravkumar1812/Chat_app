import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/styledComponents";

const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{ padding: "1.5rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
        <SearchField placeholder="search" />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          display={{
            xs: "none",
            md: "block",
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >
          {moment().format("MMMM Do YYYY h:mm:ss a")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const Widgets = <Stack></Stack>;
  return (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}

        <Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"}>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
            }}
          >
            <Typography margin={"2rem 0"} variant="h4" >Last Messages</Typography>
            {"chat"}
          </Paper>
          <Paper elevation={3}
          sx={{
            padding:"1rem",
            borderRadius:"1rem",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            width:{xs:"100%",sm:"50%"},
            position:"relative",
            width:"100%",
            maxWidth:"25rem"
          }}
          >
        {"Dougnut Chart"}
        <Stack 
        position={"absolute"}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={"0.5rem"}
        width={"100%"}
        height={"100%"}
        >
     <GroupIcon/>  <Typography>
        vs
     </Typography>
     <PersonIcon/>
        </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};

export default Dashboard;
