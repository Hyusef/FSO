import React from "react";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const vote = (id) => {
    console.log("vote", id);
  };
  return (
    <div className="App">
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => {
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}> Vote</button>
          </div>
        </div>;
      })}
      <h2> Create New</h2>
      <form>
        <div>
          <input />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
}

export default App;
