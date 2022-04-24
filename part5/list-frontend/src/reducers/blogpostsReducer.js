const blogpostsReducer = (state = "", action) => {
  switch (action.type) {
    case "SAVEBLOG":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default blogpostsReducer;
