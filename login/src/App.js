import "./App.css";
import { ROUTE } from "./constant/route";
import { Route, Routes } from "react-router-dom";
import Login from "./page/login/Login";
// import Home from ".page/home";
import MagicLink from "./page/magic-link/magic-link";

function App() {
  return (
    <>
      <Routes>
        <Route path={ROUTE.LOGIN} element={<Login />} exact />
        <Route path={ROUTE.VALIDATE} element={<MagicLink />} exact />
        {/* <Route path={ROUTE.HOME} element={<Home />} exact /> */}
      </Routes>
    </>
  );
}

export default App;
