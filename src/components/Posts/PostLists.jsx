import React from "react";
import { useGetPostsQuery } from "./postsSlice";
import Post from "./Post";

const PostLists = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();
  let content;
  if (isLoading) {
    content = <p>LOADING..</p>;
  }
  if (isError) {
    // console.log(error);
    content = <p>{error.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = posts;
    content = ids?.length
      ? ids.map((postId) => <Post key={postId} postId={postId} />)
      : null;
  }
  return <div>{content}</div>;
};

export default PostLists;
