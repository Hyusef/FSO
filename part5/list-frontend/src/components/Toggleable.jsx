import { useState } from "react";
import propTypes from 'prop-types'


function Toggleable(props) {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const ShowWhenVisible = { display: visible ? "" : "none" };


  
  const toggleVisib = () => {
    
    setVisible(!visible);
  };
  return (
    <div>
      <div style={hideWhenVisible}>
        <button id="firstLogin" onClick={toggleVisib}>{props.buttonLabel}</button>
      </div>

      <div style={ShowWhenVisible}>
        {props.children}
        <button onClick={toggleVisib}>Cancel</button>
      </div>
    </div>
  );
}

Toggleable.propTypes={
  buttonLabel: propTypes.string.isRequired
}

export default Toggleable;

