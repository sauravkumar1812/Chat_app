import React from "react";
import { Container, Paper, Typography, TextField, Button, Avatar,Stack , IconButton } from "@mui/material";
import { bgColorGradint } from "../../constants/color";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";

    const isAdmin = true;

const AdminLogin = () => {

    const secretkey = useInputValidation("");
    const submitHandler =(e) =>{
   e.preventDefault();
   console.log("submit")
    }
    if(isAdmin) return <Navigate to="/admin/dashboard"/>
  return( <div 
    style={{
      backgroundImage:bgColorGradint
    }}
    >
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
       
            <Typography variant="h5">Admin  Login</Typography>

            <form style={{
              width:"100%",
              marginTop:"1rem",
            }}
            onSubmit = {submitHandler}
            >
              <TextField
                required
                fullWidth
                label="Secret Key"
                margin="normal"
                type="password"
                variant="outlined"
                value={secretkey.value}
                onChange={secretkey.changeHandler}
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
            </form>
      </Paper>
    </Container>
    </div>)
};

export default AdminLogin;
