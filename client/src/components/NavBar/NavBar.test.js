import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NavBar from "./NavBar";
import { Provider } from "react-redux";
import store from "../../redux/store";

describe("AppDrawer", () => {
  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );
  });

  test("should call onMenuClick when menu button is clicked", () => {
    const onMenuClick = jest.fn();

    const { getByTestId } = render(
      <Provider store={store}>
        <NavBar onMenuClick={onMenuClick} />
      </Provider>
    );

    fireEvent.click(getByTestId("menu"));

    expect(onMenuClick).toBeCalledTimes(1);
  });
  test("should add children", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <NavBar>
          <div data-testid="test">test</div>
        </NavBar>
      </Provider>
    );

    expect(() => getByTestId("test")).not.toThrow();
  });

  test("should set title", () => {
    const { getByText } = render(
      <Provider store={store}>
        <NavBar title="someTitle" />
      </Provider>
    );

    expect(() => getByText("someTitle")).not.toThrow();
  });
});
