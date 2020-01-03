import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AppDrawer from "./AppDrawer";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createReducer } from "../../redux/reducer";

import thunk from "redux-thunk";

const store = createStore(
  createReducer({
    user: {
      email: "email1@gmail.com"
    }
  }),
  applyMiddleware(thunk)
);

describe("AppDrawer", () => {
  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Route
            path="*" // get ridden of staticContext or else react will log an error
            render={({ staticContext, ...props }) => {
              return <AppDrawer {...props} open />;
            }}
          />
        </MemoryRouter>
      </Provider>
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
      <Provider store={store}>
        <MemoryRouter>
          <Route
            path="*"
            render={({ staticContext, ...props }) => {
              locationTest = props.location;
              return <AppDrawer {...props} open />;
            }}
          />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(getByText(text));

    expect(locationTest.pathname).toBe(route);
  });

  test("should render correct email", () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Route
            path="*" // get ridden of staticContext or else react will log an error
            render={({ staticContext, ...props }) => {
              return <AppDrawer {...props} open />;
            }}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(() => getByText("email1@gmail.com")).not.toThrow();
  });
});
