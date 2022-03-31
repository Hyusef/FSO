import { useState } from "react";

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const average = (good + bad + neutral) / 3;
  return (
    <>
      <table>
        <tr>
          <th>
            <p>Good</p>
          </th>
          <th>
            <p>{good}</p>
          </th>
        </tr>
        <tr>
          <th>
            <p>Neutral</p>
          </th>
          <th>
            <p>{neutral}</p>
          </th>
        </tr>

        <tr>
          <th>
            <p>Bad</p>
          </th>
          <th>
            <p>{bad}</p>
          </th>
        </tr>

        <tr>
          <th>
            <p>Average</p>
          </th>
          <th>
            <p>{neutral + good + bad}</p>
          </th>
        </tr>

        <tr>
          <th>
            <p>Positive</p>
          </th>
          <th>
            <p>{good / all}%</p>
          </th>
        </tr>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [input, setInput] = useState(false);

  const goodHandler = () => {
    setGood(good + 1);
    setInput(true);
  };

  const neutralHandler = () => {
    setNeutral(neutral + 1);
    setInput(true);
  };

  const badHandler = () => {
    setBad(bad + 1);
    setInput(true);
  };

  const all = good + neutral + bad;
  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={goodHandler}>Good</button>
      <button onClick={neutralHandler}>neutral</button>
      <button onClick={badHandler}>Bad</button>
      {input ? (
        <Statistics good={good} bad={bad} neutral={neutral} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
