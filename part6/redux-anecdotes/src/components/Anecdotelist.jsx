import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { votePutAction } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/messageReducer";
import { voteFn } from "../reducers/anecdoteReducer";

function Anecdotelist(props) {
  const anecdotes = props;
  const vote = (id, content) => {
    /*dispatch({ type: "quotes/voteFn", id: id });
    dispatch(votePutAction(id));
    dispatch(setNotification(content)); */
    let secs = 2;
    props.voteFn(id);
    props.votePutAction(id);
    props.setNotification(content, secs);
  };

  const filteredArr = anecdotes.anecdote.filter((el) =>
    el.content.includes(anecdotes.filter)
  );

  //console.log(filteredArr);
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

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  voteFn,
  setNotification,
  votePutAction,
};

const connectedList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotelist);

export default connectedList;
