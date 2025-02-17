import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Login.module.css";
import logo from "../../asset/logo.png";
import Button from "@mui/material/Button";
import {
  OutlinedInput,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Icon } from "@iconify/react";
import eyeIcon from "../../asset/icon/solar--eye-outline.svg";
import eyeOffIcon from "../../asset/icon/solar--eye-closed-outline.svg";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {isAuth, email, token} = useSelector((state) => state.auth)
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(false);

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length > 3) {
      if (!emailRegex.test(value)) {
        setError("Email tidak valid");
      } else {
        setError("");
      }
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    navigate(ROUTE.VALIDATE);
  };

  return (
    <>
      <div className={style.canvas}>
        <div className={style.container}>
          <div className={style.header}>
            <img alt="logo" src={logo} />
            <h2>Tjendana Coffee</h2>
          </div>
          <div className={style.form}>
            <TextField
              value={email}
              onChange={handleChangeEmail}
              placeholder="email"
              sx={{ width: 350, alignSelf: "center" }}
              error={!!error} // Menandakan jika ada error
              helperText={error} // Menampilkan pesan kesalahan
            />
          </div>
          <div className={style.footer}>
            <Button
              variant="primary"
              onClick={handleSubmit}
              style={{
                width: 350,
                padding: "12px 20px",
                fontSize: "16px",
                backgroundColor: "#685252",
                color: "#fff",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
