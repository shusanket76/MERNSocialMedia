import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();
export const extendedusersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (resData) => {
        const loadedUsers = resData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
    }),
  }),
});

export const { useGetUsersQuery } = extendedusersSlice;
export const selectUserData = extendedusersSlice.endpoints.getUsers.select();

export const selectUserSelector = createSelector(
  selectUserData,
  (userData) => userData.data
);

export const {
  selectAll: selectAllUsers,
  selectIds: selectUserIds,
  selectById: selectUserById,
} = usersAdapter.getSelectors(
  (state) => selectUserSelector(state) ?? initialState
);
