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
      state = "";
      return state;
    },
  },
});

export const { createMsg, removeMsg } = msgSlice.actions;
export const setNotification = (data, secs) => {
  return async (dispatch) => {
    dispatch(createMsg(data));
    setTimeout(() => {
      dispatch(removeMsg);
    }, secs * 1000);
  };
};

export default msgSlice.reducer;
