import React from "react";
import { connect } from "react-redux";
import quotes from "../services/quotes";
import { createBlogAction } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/messageReducer";

function Anecdoteform(props) {
  const createHandler = (e) => {
    e.preventDefault();
    const quote = e.target.quote.value;
    props.createBlogAction(quote);
    /* dispatch({ type: "message/createMsg", data: quote });
    dispatch(createBlogAction(quote));
    setTimeout(() => {
      dispatch({ type: "message/removeMsg" });
      dispatch(setNotification(quote, 10));
    }, 5000); */

    props.setNotification(quote, 10);
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

const mapDispatchToProps = {
  setNotification,
  createBlogAction,
};

const connectedForm = connect(null, mapDispatchToProps)(Anecdoteform);

export default connectedForm;
