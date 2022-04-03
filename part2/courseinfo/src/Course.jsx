import React from "react";


const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ part, ex }) => (
  <p>
    {part} {ex}
  </p>
);

const Content = ({ parts }) => {
  return parts.map((el) => <Part part={el.name} ex={el.exercises} />);
};

const Total = ({ parts }) => {
  const returnReduce = parts.reduce((a, b) => {
    return a + b.exercises;
  }, 0);

  return <p>{returnReduce}</p>;
};

function Course({course}) {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}

export default Course;
