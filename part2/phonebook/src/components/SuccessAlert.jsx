import React from "react";
function SuccessAlert({ message }) {
  if (message == null) return "";
  return <div className="sucesss">{message}</div>;
}
export default SuccessAlert;
