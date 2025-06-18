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
     updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    SignOutUserStart: (state) => {
      state.loading = true;
    },
    SignOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    SignOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

  },
});

export const {
  signInStart,
  signInSuccess,
  signInfailure,
  updateUser, // ✅ Export this!
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  SignOutUserStart,
  SignOutUserSuccess,
  SignOutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
