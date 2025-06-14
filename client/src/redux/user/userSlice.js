import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInfailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // ✅ Add this to support profile updating
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInfailure,
  updateUser, // ✅ Export this!
} = userSlice.actions;

export default userSlice.reducer;
