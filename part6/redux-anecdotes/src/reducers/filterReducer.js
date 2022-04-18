import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const ƒilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterAction(state, action) {
      state = action.data;
      return state;
    }, 
  },
});

export const { filterAction } = ƒilterSlice.actions;
export default ƒilterSlice.reducer;

