import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

const App = () => {
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const total = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header courseName={"Half Stack application development"} />
      <Content courseParts={courseParts} />
      <p>Number of exercises </p>
      <Total myTotal={total} />
    </div>
  );
};

export default App;
