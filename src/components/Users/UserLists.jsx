import React from "react";
import { useGetUsersQuery } from "./usersSlice";
import User from "./User";

const UserLists = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;
  if (isLoading) {
    content = <p>LOADING...</p>;
  }
  if (isError) {
    content = <p>{error.error}</p>;
  }
  if (isSuccess) {
    const { ids } = users;
    content = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId}></User>)
      : null;
  }
  return <div>{content}</div>;
};

export default UserLists;
