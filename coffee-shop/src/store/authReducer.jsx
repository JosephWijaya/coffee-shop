import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    addEmaiL: (state, action) => {
      state.email = action.payload;
    },
    logout: (state = initialState) => {
      return initialState;
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
