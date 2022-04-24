import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./reducers/messageReducer";
import blogpostsReducer from "./reducers/blogpostsReducer";


const store = configureStore({
  reducer: {
    messages:messageReducer,
    blogs:blogpostsReducer,
  },
});

export default store;
//Store the information about blog posts in the Redux store.
// In this exercise, it is enough that you can see the blogs in the backend and create a new blog.

