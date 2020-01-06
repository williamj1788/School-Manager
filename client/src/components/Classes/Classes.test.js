import React from "react";
import { render } from "@testing-library/react";
import Classes from "./Classes";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createReducer } from "../../redux/reducer";

import thunk from "redux-thunk";

import { MemoryRouter, Route } from "react-router-dom";

const store = createStore(
  createReducer({
    classes: [
      {
        _id: "mock",
        name: "mockName",
        teacher: "mockTeacher",
        color: "#ff0000"
      }
    ],
    user: {
      email: "mockEmail"
    }
  }),
  applyMiddleware(thunk)
);

describe("Classes", () => {
  test("should render without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Route path="*" render={props => <Classes {...props} />} />
        </MemoryRouter>
      </Provider>
    );
  });
});
