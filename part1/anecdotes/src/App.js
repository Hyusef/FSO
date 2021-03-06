import { useState } from "react";

const App = () => {
  const [selected, setSelected] = useState(0);

  const nextHandler = () => {
    setSelected(Math.round(Math.random() * (anecdotes.length - 1)));
  };

  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const voteHandler = () => {
    const copy = [...points];
    copy[selected]++;
    setPoints(copy);
  };
  const max = Math.max(...points);
  const indexOfMax = points.indexOf(max);



  return (
    <div>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <div>
        <button onClick={nextHandler}> Next anecdote</button>
        <button onClick={voteHandler}>Vote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[indexOfMax]}</p>
    </div>
  );
};

export default App;
