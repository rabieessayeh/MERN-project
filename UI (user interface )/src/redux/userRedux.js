import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    isConnect:false,
    prenom: "",
    isAdmin: false
  },
  reducers: {
    loginStart: (state) => {
      state.isConnect = true;
    },
    loginSuccess: (state, action) => {
      state.isConnect = true;
      state.userId = action.payload.id;
      state.prenom = action.payload.prenom;
      state.isAdmin = action.payload.isAdmin;
    },
    loginFailure: (state) => {
      state.isConnect = false;
    },
    Disconnect: (state) => {
      state.isConnect = false;
      state.prenom = "";
      state.userId = null;
      state.isAdmin = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, Disconnect } = userSlice.actions;
export default userSlice.reducer;
