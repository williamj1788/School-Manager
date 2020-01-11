import React from "react";
import Dashboard from "./Dashboard";
import { MemoryRouter, Route } from "react-router-dom";

import { renderWithRedux } from "../../testHelpers";

describe("Dashboard", () => {
  test("renders without crashing", () => {
    renderWithRedux(
      <MemoryRouter>
        <Route path="*" render={props => <Dashboard {...props} />} />
      </MemoryRouter>
    );
  });
});
