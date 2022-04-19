import React from "react";
import { connect, useDispatch } from "react-redux";
import { filterAction } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (event) => {
    props.filterAction(event.target.value);
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

const mapDispatchToProps = { filterAction };
const mapStateToProps = (state) => state;

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default ConnectedFilter;
