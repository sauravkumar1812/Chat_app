import React, { useState } from "react";
import { Container } from "@mui.material";

const isLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
};

const Login = () => {
  return (
    <Container component={main} maxWidth="sx">
      <paper
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
            <Typography variant="h5"> Login</Typography>

            <form>
                <TextField></TextField>
            </form>
          </>
        ) : (
          <span>Register</span>
        )}
      </paper>
    </Container>
  );
};

export default Login;
