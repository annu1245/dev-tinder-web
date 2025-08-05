import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload 
    }
  }
})

export const { addUser } = authSlice.actions;
export default authSlice.reducer;