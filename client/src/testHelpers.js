import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer, { initialState as initState } from "./redux/reducer";
import { render } from "@testing-library/react";
import thunk from "redux-thunk";

export function renderWithRedux(
  ui,
  {
    initialState = initState,
    store = createStore(reducer, initialState, applyMiddleware(thunk))
  } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}
