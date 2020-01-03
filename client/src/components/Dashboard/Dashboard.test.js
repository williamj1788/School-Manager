import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";

describe("Dashboard", () => {
  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Route path="*" render={props => <Dashboard {...props} />} />
        </MemoryRouter>
      </Provider>
    );
  });
});
