import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../asset/logo.png";
import { Button, Container, Paper, Typography } from "@mui/material";
import { authAction } from "../../store/authReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { email, token } = useSelector((state) => state.auth);

  return (
    <Container
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#ebebebeb",
      }}
    >
      <Paper
        sx={{
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          backgroundColor: "#f9ffff",
          border: "1px solid #646464",
          borderRadius: "12px",
          p: "24px",
          m: "auto",
          gap: "36px",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            mt: "24px",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <img
            alt="logo"
            src={logo}
            style={{
              width: "50px",
              height: "35px",
              alignSelf: "center",
            }}
          />
          <Typography variant="h4">Tjendana Coffee</Typography>
        </Container>

        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "16px",
            gap: "16px",
          }}
        >
          <Typography variant="h5">Authentication Successful!</Typography>
          <Typography variant="h6">email : {email}</Typography>
          <Typography variant="h6">token : {token}</Typography>
        </Container>
        <Container
          sx={{
            display: "flex",
            alignSelf: "center",
          }}
        >
          <Button
            variant="primary"
            onClick={() => dispatch(authAction.logout())}
            sx={{
              width: "350px",
              p: "12px 20px",
              fontSize: "16px",
              backgroundColor: "#8d6767",
              color: "#fff",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#685252",
              },
            }}
          >
            Logout
          </Button>
        </Container>
      </Paper>
    </Container>
  );
};

export default Home;
