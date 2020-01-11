import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AppDrawer from "./AppDrawer";
import { MemoryRouter, Route } from "react-router-dom";
import { renderWithRedux } from "../../testHelpers";

const defaultInitialState = {
  user: {
    email: "email1@gmail.com"
  }
};

describe("AppDrawer", () => {
  test("renders without crashing", () => {
    renderWithRedux(
      <MemoryRouter>
        <Route
          path="*" // get ridden of staticContext or else react will log an error
          render={({ staticContext, ...props }) => {
            return <AppDrawer {...props} open />;
          }}
        />
      </MemoryRouter>,
      { initialState: defaultInitialState }
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

    const { getByText } = renderWithRedux(
      <MemoryRouter>
        <Route
          path="*"
          render={({ staticContext, ...props }) => {
            locationTest = props.location;
            return <AppDrawer {...props} open />;
          }}
        />
      </MemoryRouter>,
      { initialState: defaultInitialState }
    );

    fireEvent.click(getByText(text));

    expect(locationTest.pathname).toBe(route);
  });

  test("should render correct email", () => {
    const { getByText } = renderWithRedux(
      <MemoryRouter>
        <Route
          path="*" // get ridden of staticContext or else react will log an error
          render={({ staticContext, ...props }) => {
            return <AppDrawer {...props} open />;
          }}
        />
      </MemoryRouter>,
      { initialState: defaultInitialState }
    );

    expect(() => getByText("email1@gmail.com")).not.toThrow();
  });
});
