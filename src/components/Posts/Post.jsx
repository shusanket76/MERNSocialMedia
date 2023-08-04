import React from "react";
import { selectPostById } from "./postsSlice";
import { useSelector } from "react-redux";

const Post = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  return <div>{post.message}</div>;
};

export default Post;
