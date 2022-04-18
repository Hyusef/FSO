import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import messageReducer from "./reducers/messageReducer";
import filterReducer from "./reducers/filterReducer";

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    message: messageReducer,
    filter: filterReducer,
  },
});

export default store;
