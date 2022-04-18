import React from "react";
import { useDispatch } from "react-redux";

function Anecdoteform() {
  const dispatch = useDispatch();
  const createHandler = (e) => {
    e.preventDefault();
    const quote = e.target.quote.value;
    e.target.quote.value = "";
    dispatch({ type: "quotes/createBlog", data: quote });
    dispatch({ type: "message/createMsg", data: quote });
    setTimeout(() => {
      dispatch({ type: "message/removeMsg" });
    }, 5000);
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
