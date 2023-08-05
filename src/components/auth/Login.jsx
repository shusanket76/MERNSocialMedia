import React, { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { accessToken } = await login({ username, password }).unwrap();
    dispatch(setCredentials({ accessToken }));
    setPassword("");
    setUsername("");
    navigate("/posts");
  };
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError]);
  return (
    <>
      <div className="m-10">
        <form className="grid" onSubmit={handleSubmit}>
          <label>USERNAME</label>
          <input
            type="text"
            value={username}
            placeholder="USERNAME"
            autoComplete="off"
            className="border border-black p-5"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label>PASSWORD</label>
          <input
            type="password"
            autoComplete="off"
            placeholder="PLACEHOLDER"
            value={password}
            className="border border-black p-5"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="p-5 bg-black text-white mt-5">LOGIN</button>
        </form>
      </div>
    </>
  );
};

export default Login;
