const Header = ({ course }) => <h1>{course}</h1>;
const Part = ({ parts, ex }) => (
  <p>
    {parts} {ex}
  </p>
);
const Content = ({ parts }) => {
  return (
    <>
      <Part parts={parts[0].name} ex={parts[0].exercises} />
      <Part parts={parts[1].name} ex={parts[1].exercises} />
      <Part parts={parts[2].name} ex={parts[2].exercises} />
    </>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
};

function App() {
  const course = {
    name: "Half stack applicaiton development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "USing props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default App;
