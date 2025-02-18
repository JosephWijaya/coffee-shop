import "./App.css";
import { ROUTE } from "./constant/route";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./page/login/Login";
import MagicLink from "./page/magic-link/magic-link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "./page/home/home";

function App() {
  const navigate = useNavigate();
  const { email, token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!email) {
      navigate(ROUTE.LOGIN);
    } else if(!token){
      navigate(ROUTE.VALIDATE);
    }
  }, [email, token, navigate]);

  return (
    <>
      <Routes>
        <Route path={ROUTE.LOGIN} element={<Login />} exact />
        <Route path={ROUTE.VALIDATE} element={<MagicLink />} exact />
        <Route path={ROUTE.HOME} element={<Home />} exact />
      </Routes>
    </>
  );
}

export default App;
