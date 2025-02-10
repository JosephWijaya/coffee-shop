import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  // const {isAuth, email, token} = useSelector((state) => state.auth)
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  return (
    <>
      <div></div>
    </>
  );
};

export default Login;
