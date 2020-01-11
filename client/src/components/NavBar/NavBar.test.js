import React from "react";
import { fireEvent } from "@testing-library/react";
import NavBar from "./NavBar";

import { renderWithRedux } from "../../testHelpers";

describe("AppDrawer", () => {
  test("renders without crashing", () => {
    renderWithRedux(<NavBar />);
  });

  test("should call onMenuClick when menu button is clicked", () => {
    const onMenuClick = jest.fn();

    const { getByTestId } = renderWithRedux(
      <NavBar onMenuClick={onMenuClick} />
    );

    fireEvent.click(getByTestId("menu"));

    expect(onMenuClick).toBeCalledTimes(1);
  });
  test("should add children", () => {
    const { getByTestId } = renderWithRedux(
      <NavBar>
        <div data-testid="test">test</div>
      </NavBar>
    );

    expect(() => getByTestId("test")).not.toThrow();
  });

  test("should set title", () => {
    const { getByText } = renderWithRedux(<NavBar title="someTitle" />);

    expect(() => getByText("someTitle")).not.toThrow();
  });
});
