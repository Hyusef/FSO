import React from "react";

function Filter(props) {
  return (
    <div>
      filter shown with:
      <input
        type="text"
        value={props.searchValue}
        onChange={props.searchChange}
      />
    </div>
  );
} 

export default Filter;
