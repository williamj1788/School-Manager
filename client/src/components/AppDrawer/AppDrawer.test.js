import React from "react";
import { render } from "@testing-library/react";
import AppDrawer from "./AppDrawer";

describe("AppDrawer", () => {
  test("renders without crashing", () => {
    render(<AppDrawer />)
  })
});