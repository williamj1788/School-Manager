import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NavBar from "./NavBar";

describe("AppDrawer", () => {
  test("renders without crashing", () => {
    render(<NavBar />);
  });

  test("should call onMenuClick when menu button is clicked", () => {
    const onMenuClick = jest.fn();

    const { getByTestId } = render(<NavBar onMenuClick={onMenuClick} />);

    fireEvent.click(getByTestId("menu"));

    expect(onMenuClick).toBeCalledTimes(1);
  });
  test("should add children", () => {
    const { getByTestId } = render(
      <NavBar>
        <div data-testid="test">test</div>
      </NavBar>
    );

    expect(() => getByTestId("test")).not.toThrow();
  });

  test("should set title", () => {
    const { getByText } = render(<NavBar title="someTitle" />);

    expect(() => getByText("someTitle")).not.toThrow();
  });
});
