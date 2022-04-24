const reducer = (state = "", action) => {
  switch (action.type) {
    case "ERROR":
      state = "Error: Wrong pass or Username";
      return state;
    case "SUCCESS":
        console.log(action.payload)
      state = action.payload;
      return state
    case "CLEAR":
      state = false;
      return state;
    default:
      return state;
  }
};

export default reducer;
