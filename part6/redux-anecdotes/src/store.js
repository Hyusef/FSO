import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer, { appendBlog,setBlog} from "./reducers/anecdoteReducer";
import messageReducer from "./reducers/messageReducer";
import filterReducer from "./reducers/filterReducer";
import quotes from "./services/quotes";

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    message: messageReducer,
    filter: filterReducer,
  },
});


export default store;
