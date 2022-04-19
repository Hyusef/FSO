import React from "react";
import { useSelector, useDispatch } from "react-redux"
function App() {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const vote = (id) => {
    console.log("vote", id);
  };

    const good = useSelector(state=>state.good)
    const neutral = useSelector(state=>state.neutral)
    const bad = useSelector(state=>state.bad)
  return (
    <div className="App">
      <h1>Give feedback</h1>
      <button onClick={()=>dispatch({type:'GOOD'})}>Good</button>
      <button onClick={()=>dispatch({type:'NEUTRAL'})}>Neutral</button>
      <button onClick={()=>dispatch({type:'BAD'})}>Bad</button>
      <p>Good : {good}  </p>
      <p>Neutral : {neutral} </p>
      <p>Bad: {bad} </p>
      <p>Total: {good+neutral+bad} </p>



    </div>
  );
}

export default App;
