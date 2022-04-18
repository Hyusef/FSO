import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Filter = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChange = (event) => {
        dispatch({type:"filter/filterAction",data:event.target.value})
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
