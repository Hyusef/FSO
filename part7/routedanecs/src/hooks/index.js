import { useState } from "react";

export const useField = (type) => {
  const [value, setvalue] = useState("");

  const onChange = (event) => {
    event.preventDefault();
    setvalue(event.target.value);
  };

  const onClick = () => {
    setvalue("");
  };

  return { type, value, onChange, onClick };
};
