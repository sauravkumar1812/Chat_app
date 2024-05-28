import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin(false);
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
            <Typography variant="h5">Login</Typography>

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
                Login
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
                Sign up Instead
              </Button>
            </form>
          </>
         ) : (
          <span>register</span>
          )
        }
      </Paper>
    </Container>
  );
};

export default Login;
