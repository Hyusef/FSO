import { createSlice } from "@reduxjs/toolkit";
const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    voteFn(state, action) {
      const incByOne = state.find((n) => n.id === action.id);
      const changedQuote = {
        ...incByOne,
        votes: incByOne.votes + 1,
      };
      return state.map((b) => (b.id !== action.id ? b : changedQuote));
    },

    createBlog(state, action) {
      return state.concat(asObject(action.data));
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

export const { createBlog, voteFn } = quoteSlice.actions;
export default quoteSlice.reducer;
