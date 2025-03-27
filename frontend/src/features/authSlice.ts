import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthId: (state, action) => {
      state.authId = action.payload;
    },
  },
});

export const { setAuthId } = authSlice.actions;
export default authSlice.reducer;
