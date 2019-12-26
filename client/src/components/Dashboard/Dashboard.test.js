import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  test("renders without crashing", () => {
    render(<Dashboard />)
  })
});