import React from "react";
import { useSelector, useDispatch } from "react-redux";

//two things need to be done
//NB: It should be as soon as the app begins
//get the quotes from the server
//and store the new created notes in the server
//done

function Anecdotelist() {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch({ type: "quotes/voteFn", id: id });
    dispatch({ type: "message/createMsg", data: content });
    setTimeout(() => {
      dispatch({ type: "message/removeMsg" });
    }, 5000);
  };

  const filteredArr = anecdotes.anecdote.filter((el) =>
    el.content.includes(anecdotes.filter)
  );

  console.log(filteredArr);
  const sortedArr = anecdotes.anecdote
    .slice()
    .sort((a, b) => b.votes > a.votes);

  return (
    <div>
      {anecdotes.filter
        ? filteredArr.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>
                  vote
                </button>
              </div>
            </div>
          ))
        : sortedArr.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>
                  vote
                </button>
              </div>
            </div>
          ))}
    </div>
  );
}

export default Anecdotelist;
