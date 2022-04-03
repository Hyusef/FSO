import React from "react";

function Persons(props) {
  return (
    <div>
      {props.searchValue === "" &&
        props.persons.map((el) => {
          return (
            <p key={el.name + el.number}>
              {el.name} {el.number}
            </p>
          );
        })}
      {props.searchValue !== "" &&
        props.searchArray.map((el) => {
          return (
            <p key={el.name + el.number}>
              {el.name} {el.number}
            </p>
          );
    })}
    </div>
  );
}

export default Persons;
