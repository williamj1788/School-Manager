import React from "react";
import { render } from "@testing-library/react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createReducer } from "../../redux/reducer";

import thunk from "redux-thunk";

import ClassDetail from "./ClassDetail";

const store = createStore(
  createReducer({
    classes: [
      {
        _id: "mock",
        name: "mockName",
        teacher: "mockTeacher",
        color: "#ff0000"
      }
    ]
  }),
  applyMiddleware(thunk)
);


describe("ClassDetails", () => {
  test("should render without crashing", () => {
    render(<Provider store={store}><ClassDetail open classID="mock" /></Provider>);
  });
});