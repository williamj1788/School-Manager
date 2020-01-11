import React from "react";
import { fireEvent, wait } from "@testing-library/react";

import ClassDetail from "./ClassDetail";

import { renderWithRedux } from "../../testHelpers";

const defaultInitialState = {
  classes: [
    {
      _id: "mock",
      name: "mockName",
      teacher: "mockTeacher",
      color: "#ff0000"
    }
  ]
};

describe("ClassDetails", () => {
  const defaultProps = {
    classID: "mock",
    open: true,
    onClose: jest.fn()
  };

  beforeEach(() => {
    defaultProps.onClose.mockReset();
  });

  test("should render without crashing", () => {
    renderWithRedux(<ClassDetail {...defaultProps} />, {
      initialState: defaultInitialState
    });
  });

  test("should call onClose prop when close button is pressed", () => {
    const { getByTestId } = renderWithRedux(<ClassDetail {...defaultProps} />, {
      initialState: defaultInitialState
    });

    const closeButton = getByTestId("close button");

    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toBeCalledTimes(1);
  });

  test("should show settings menu when settings button is clicked", () => {
    const { getByTestId } = renderWithRedux(<ClassDetail {...defaultProps} />, {
      initialState: defaultInitialState
    });

    expect(() => getByTestId("menu")).toThrow();

    fireEvent.click(getByTestId("setting button"));

    expect(() => getByTestId("menu")).not.toThrow();

    // TODO: find a way to fire the onClose event to test if the menu actually closes
  });

  test("should call onClose and demount menu when 'delete class' item is clicked", async () => {
    const { getByTestId, getByText } = renderWithRedux(
      <ClassDetail {...defaultProps} />,
      { initialState: defaultInitialState }
    );

    fireEvent.click(getByTestId("setting button"));
    fireEvent.click(getByText("Delete Class"));

    await wait(); // let state update

    expect(defaultProps.onClose).toBeCalledTimes(1);
    expect(() => getByTestId("menu")).toThrow();
  });
});
