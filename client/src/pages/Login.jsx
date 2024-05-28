import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin(false);
  return (
    <Container component="main" maxWidth="sx">
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

            <form>
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
              <Typography>Or</Typography>
              <Button
                sx={{
                  marginTop: "1rem",
                }}
                fullWidth
                variant="text"
                onClick={toggleLogin}
              >
                Signin
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
