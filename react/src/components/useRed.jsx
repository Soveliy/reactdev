import { useReducer } from "react";
const initialState = { count: 0, step: 1 };
function reducer(state, action) {
  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + state.step };
    case "step":
      return { ...state, step: action.value };
    case "reset":
      return initialState;
    default:
      throw new Error("неизвестное действие");
  }
}

reducer("increase");
