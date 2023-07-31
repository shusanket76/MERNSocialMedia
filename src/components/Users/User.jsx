import React from "react";
import { selectUserById } from "./usersSlice";
import { useSelector } from "react-redux";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  return <div>{user.username}</div>;
};

export default User;
