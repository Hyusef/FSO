import { createSlice } from "@reduxjs/toolkit";
import quotes from "../services/quotes";
import axios from "axios";

const getId = () => (100000 * Math.random()).toFixed(0);
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = [];

const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    voteFn(state, action) {
      const incByOne = state.find((n) => n.id === action.payload);
      const changedQuote = {
        ...incByOne,
        votes: incByOne.votes + 1,
      };
      return state.map((b) => (b.id !== action.payload ? b : changedQuote));
    },

    createBlog(state, action) {
      return state.concat(asObject(action.data));
    },

    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlog(state, action) {
      return action.payload;
    },
  },
});

/* const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      const incByOne = state.find((n) => n.id === action.id);
      const changedQuote = {
        ...incByOne,
        votes: incByOne.votes + 1,
      };
      return state.map((b) => (b.id !== action.id ? b : changedQuote));
      break;
    case "CREATE":
      return state.concat(asObject(action.data));
    default:
      return state;
      break;
  }
  return state;
};

export const createBlog = (data) => {
  return {
    type: "CREATE",
    data: data,
  };
};

export const voteFn = (id)=>{
  return{
    type:'VOTE',
    id:id
  }
} */

export const { createBlog, voteFn, appendBlog, setBlog } = quoteSlice.actions;
export const initializeApp = () => {
  return async (dispatch) => {
    const blogs = await quotes.getAll();
    dispatch(setBlog(blogs));
  };
};

export const createBlogAction = (content) => {
  return async (dispatch) => {
    const blogs = await quotes.createNew(content);
    dispatch(appendBlog(blogs));
  };
};

export const votePutAction = (id) => {
  return async (dispatch) => {
    const blogToInc = await axios.get(`http://localhost:3003/anecdotes/${id}`);

    const blogobject = {
      ...blogToInc.data,
      votes: blogToInc.data.votes + 1,
    };
    quotes.putNew(id, blogobject);
  };
};

export default quoteSlice.reducer;
