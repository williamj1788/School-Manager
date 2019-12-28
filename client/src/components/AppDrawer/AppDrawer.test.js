import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AppDrawer from "./AppDrawer";
import { MemoryRouter, Route } from "react-router-dom";

describe("AppDrawer", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Route
          path="*" // get ridden of staticContext or else react will log an error
          render={({ staticContext, ...props }) => {
            return <AppDrawer {...props} open />;
          }}
        />
      </MemoryRouter>
    );
  });

  test.each([
    ["Dashboard", "/dashboard"],
    ["Classes", "/classes"],
    ["Tasks", "/tasks"],
    ["Exams", "/exams"],
    ["Settings", "/settings"]
  ])("%s : navigate to %s on button click", (text, route) => {
    let locationTest;

    const { getByText } = render(
      <MemoryRouter>
        <Route
          path="*"
          render={({ staticContext, ...props }) => {
            locationTest = props.location;
            return <AppDrawer {...props} open />;
          }}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByText(text));

    expect(locationTest.pathname).toBe(route);
  });
});
