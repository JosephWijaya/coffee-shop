import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../asset/logo.png";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";
import { ROUTE } from "../../constant/route";
import { authAction } from "../../store/authReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.length > 3) {
        if (!emailRegex.test(email)) {
          setError("Email tidak valid");
        } else {
          setError("");
          dispatch(authAction.addEmaiL(email));
          navigate(ROUTE.VALIDATE);
        }
      } else {
        setError("Email tidak valid");
      }
    },
    [email]
  );

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
            flexDirection: "column",
            p: "16px",
            gap: "16px",
          }}
        >
          <TextField
            value={email}
            onChange={handleChangeEmail}
            placeholder="email"
            sx={{ width: "350px", alignSelf: "center",
              "@media (max-width:426px)": {
                width: "100%",
              },
            }}
            error={!!error}
            helperText={error}
          />
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
            Login by Magic Link
          </Button>
        </Container>
      </Paper>
    </Container>
  );
};

export default Login;
