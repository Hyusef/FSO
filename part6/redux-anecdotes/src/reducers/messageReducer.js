import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const msgSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    createMsg(state, action) {
      state = action.data;
      return state;
    },

    removeMsg(state, action) {
        state = ''
        return state;
      },
  },
});

export const { createMsg,removeMsg } = msgSlice.actions;
export default msgSlice.reducer;
