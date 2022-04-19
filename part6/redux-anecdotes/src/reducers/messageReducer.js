import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const msgSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    createMsg(state, action) {
      state = action.payload;
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
    
    let removeTimer;
    function setTimer() {
      clearTimeout(removeTimer);
      removeTimer = setTimeout(() => {
        dispatch(removeMsg());
      }, secs * 1000);
    }
        setTimer();
    console.log(removeTimer);
  };
};

export default msgSlice.reducer;
