import React from "react";

function Personform(props) {
  return (
    <form onSubmit={props.submitHandler}>
      <h2>Add a new</h2>
      <div>
        name:{" "}
        <input type="text" value={props.newName} onChange={props.nameChange} />
      </div>
      number:{" "}
      <input type="number" value={props.number} onChange={props.numberChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default Personform;
