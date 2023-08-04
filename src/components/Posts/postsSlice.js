import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const postAdapter = createEntityAdapter({});
const initialState = postAdapter.getInitialState();
export const extendedpostsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (resData) => {
        
        const loadedUsers = resData.map((post) => {
          post.id = post._id;
          return post;
        });
        return postAdapter.setAll(initialState, loadedUsers);
      },
    }),
  }),
});

export const { useGetPostsQuery } = extendedpostsSlice;
export const selectPostsData = extendedpostsSlice.endpoints.getPosts.select();
export const selectPostSelector = createSelector(
  selectPostsData,
  (postData) => postData.data
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postAdapter.getSelectors(
  (state) => selectPostSelector(state) ?? initialState
);
