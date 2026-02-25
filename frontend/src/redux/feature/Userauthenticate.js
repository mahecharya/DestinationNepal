import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload; // payload should be token string
      state.isAuthenticated = !!action.payload; // true if token exists
    },
    logoutUser: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, logoutUser } = tokenSlice.actions;
export default tokenSlice.reducer;
