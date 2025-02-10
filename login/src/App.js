import "./App.css";
import { ROUTE } from "./constant/route";
import { Route, Routes } from "react-router-dom";
import Login from "./page/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path={ROUTE.LOGIN} element={<Login />} exact />
      </Routes>
    </>
  );
}

export default App;
