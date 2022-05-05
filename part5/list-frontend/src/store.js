import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./reducers/messageReducer";
import blogpostsReducer from "./reducers/blogpostsReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    messages: messageReducer,
    blogs: blogpostsReducer,
    user: userReducer,
  },
});

export default store;
