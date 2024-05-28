import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Avatar,Stack , IconButton } from "@mui/material";
import {CameraAlt as CameraAltIcon} from "@mui/icons-material";
import { VisualyHiddenInput } from "../components/styles/styledComponents";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin((prev) => !prev);
  return (
    <Container component="main" maxWidth="xs" sx={{
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
    }}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Log in</Typography>

            <form style={{
              width:"100%",
              marginTop:"1rem",
            }}>
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                label="Password"
                margin="normal"
                type="password"
                variant="outlined"
              />
              <Button
                sx={{
                  marginTop: "1rem",
                }}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Log  in
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>OR</Typography>
              <Button
                // sx={{
                //   marginTop: "1rem",
                // }}
                fullWidth
                variant="text"
                onClick={toggleLogin}
              >
                sign up Instead
              </Button>
            </form>
          </>
         ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>

            <form style={{
              width:"100%",
              marginTop:"1rem",
            }}>
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar sx={{
                     width:"10rem",
                     height:"10rem",
                     objectFit:"contain"
                    }}/>
                    {/* for selecting the file from device */}
                    <IconButton sx={{
                      position:"absolute",
                      bottom:0,
                      right:0,
                      color:"white",
                      bgcolor:"rgba(0,0,0,0.5)",
                      ":hover":{
                        bgcolor:"rgba(0,0,0,0.8)"
                      }
                    }}
                    component="label"
                    >
                      <>
                      <CameraAltIcon/>
                      <VisualyHiddenInput type="file"/>
                      </>
                    </IconButton>
              </Stack>
               <TextField
               required
               fullWidth
               label="Name"
               margin="normal"
               variant="outlined"
              />
               <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                label="Password"
                margin="normal"
                type="password"
                variant="outlined"
              />
              <Button
                sx={{
                  marginTop: "1rem",
                }}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                sign up
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>OR</Typography>
              <Button
                // sx={{
                //   marginTop: "1rem",
                // }}
                fullWidth
                variant="text"
                onClick={toggleLogin}
              >
                login up Instead
              </Button>
            </form>
          </>
          )
        }
      </Paper>
    </Container>
  );
};

export default Login;
