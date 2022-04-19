import React from "react";
import { useDispatch } from "react-redux";
import quotes from "../services/quotes";
import { createBlogAction } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/messageReducer";

function Anecdoteform() {
  const dispatch = useDispatch();
  const createHandler = (e) => {
    e.preventDefault();
    const quote = e.target.quote.value;
    dispatch(createBlogAction(quote));
    /*     dispatch({ type: "message/createMsg", data: quote });
    setTimeout(() => {
      dispatch({ type: "message/removeMsg" });
    }, 5000); */
    dispatch(setNotification(quote, 10));
    e.target.quote.value = "";
  };

  return (
    <form onSubmit={createHandler}>
      <h2>create new</h2>
      <div>
        <input type="text" name="quote" />
      </div>
      <button>create</button>
    </form>
  );
}

export default Anecdoteform;
