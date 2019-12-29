import React from "react";
import { render } from "@testing-library/react";
import Classes from "./Classes";
import { Provider } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import store from "../../redux/store";

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
