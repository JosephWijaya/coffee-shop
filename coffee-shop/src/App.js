import "./App.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ROUTE } from "./constant/route";
import Login from "./page/login/Login";
import MagicLink from "./page/magic-link/magic-link";
import Home from "./page/home/home";
import Item from "./page/item/item";
import Recipe from "./page/recipe/recipe";

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
        <Route path={ROUTE.LOGIN} element={<Login />} />
        <Route path={ROUTE.VALIDATE} element={<MagicLink />} />
        <Route path={ROUTE.HOME} element={<Home />}>
          <Route path={ROUTE.ITEM} element={<Item />} />
          <Route path={ROUTE.RECIPE} element={<Recipe />} />
          <Route index element={<Navigate to={ROUTE.ITEM}/>} replace />
        </Route>
      </Routes>
    </>
  );
}

export default App;
