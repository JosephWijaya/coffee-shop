import "./App.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ROUTE } from "./constant/route";
import Login from "./page/login/Login";
import MagicLink from "./page/magic-link/magic-link";
import Home from "./page/home/home";
import Item from "./page/item/item";

function App() {
  const navigate = useNavigate();
  const { email, token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!email) {
      navigate(ROUTE.LOGIN);
    } else if (!token) {
      navigate(ROUTE.VALIDATE);
    }
  }, [email, token]);

  return (
    <>
      <Routes>
        <Route path={ROUTE.LOGIN} element={<Login />} exact />
        <Route path={ROUTE.VALIDATE} element={<MagicLink />} exact />
        <Route path={ROUTE.HOME} element={<Home />} exact>
          <Route path={ROUTE.ITEM} element={<Item />} exact />
          <Route index element={<Navigate to={ROUTE.ITEM}/>} replace />
        </Route>
      </Routes>
    </>
  );
}

export default App;
