import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./magic-link.module.css";
import logo from "../../asset/logo.png";
import Button from "@mui/material/Button";
// import {
//   Button,
// } from "@mui/material";

const MagicLink = () => {
  const dispatch = useDispatch();
  // const {isAuth, email, token} = useSelector((state) => state.auth)
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [passwd, setPasswd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(false);

  const generateRandomizeString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    setToken(result);
    console.log(result);
  };

  const handleSubmit = () => {
    console.log("Submit");
  };

  return (
    <>
      <div className={style.canvas}>
        <div className={style.container}>
          <div className={style.header}>
            <img alt="logo" src={logo} />
            <h2>Tjendana</h2>
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

export default MagicLink;
