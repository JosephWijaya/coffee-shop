import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../asset/logo.png";
import { Button, Container, Paper, Typography } from "@mui/material";
import { authAction } from "../../store/authReducer";
import { ROUTE } from "../../constant/route";
import { useNavigate } from "react-router-dom";

const MagicLink = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");

  const generateRandomizeString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    setToken(result);
    dispatch(authAction.addToken(result));
  };

  const handleSubmit = () => {
    generateRandomizeString();
    navigate(ROUTE.HOME);
  };

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
          "@media (max-width:426px)": {
            width: "100%",
          },
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            mt: "24px",
            gap: "12px",
            justifyContent: "center",
            "@media (max-width:426px)": {
              width: "auto",
              flexDirection: "column",
              mt: 0,
            },
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
          <Typography
            variant="h4"
            sx={{
              "@media (max-width:426px)": {
                textAlign: "center",
              },
            }}
          >
            Tjendana Coffee
          </Typography>
        </Container>
        <Container
          sx={{
            display: "flex",
            alignSelf: "center",
          }}
        >
          <Button
            variant="primary"
            onClick={handleSubmit}
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
              "@media (max-width:426px)": {
                width: "100%",
              },
            }}
          >
            Magic Link
          </Button>
        </Container>
      </Paper>
    </Container>
  );
};

export default MagicLink;
