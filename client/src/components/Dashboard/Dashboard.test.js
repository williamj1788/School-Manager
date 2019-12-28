import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { MemoryRouter, Route } from "react-router-dom";

describe("Dashboard", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Route path="*" render={props => <Dashboard {...props} />} />
      </MemoryRouter>
    );
  });
});
