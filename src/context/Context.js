import creatingContext from "./creatingContext";

const contextReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state;
  }
};

// Dispatch function
const add = (dispatch) => {
  return () => {
    dispatch({ type: "add" });
  };
};
const minus = (dispatch) => {
  return () => {
    dispatch({ type: "minus" });
  };
};

export const { Context, Provider } = creatingContext(
  contextReducer,
  { add, minus },
  0
);
