import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: null,
  token: "",
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setToken: (state, action) => {
      state.isToken = action.payload;
    },
    setEmaiL: (state, action) => {
      state.isEmail = action.payload;
    },
    logout: (state = initialState) => {
      return initialState;
    },
  },
});

export const { setAuth, setEmaiL, setToken } = authSlice.actions;

export default authSlice.reducer;
