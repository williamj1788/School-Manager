import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createReducer } from "../../redux/reducer";

import thunk from "redux-thunk";

import ClassDetail from "./ClassDetail";

const store = createStore(
  createReducer({
    classes: [
      {
        _id: "mock",
        name: "mockName",
        teacher: "mockTeacher",
        color: "#ff0000"
      }
    ]
  }),
  applyMiddleware(thunk)
);

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
    render(
      <Provider store={store}>
        <ClassDetail {...defaultProps} />
      </Provider>
    );
  });

  test("should call onClose prop when close button is pressed", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ClassDetail {...defaultProps} />
      </Provider>
    );

    const closeButton = getByTestId("close button");

    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toBeCalledTimes(1);
  });

  test("should show settings menu when settings button is clicked", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ClassDetail {...defaultProps} />
      </Provider>
    );

    expect(() => getByTestId("menu")).toThrow();

    fireEvent.click(getByTestId("setting button"));

    expect(() => getByTestId("menu")).not.toThrow();

    // TODO: find a way to fire the onClose event to test if the menu actually closes
  });

  test("should call onClose and demount menu when 'delete class' item is clicked", async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <ClassDetail {...defaultProps} />
      </Provider>
    );

    fireEvent.click(getByTestId("setting button"));
    fireEvent.click(getByText("Delete Class"));

    await wait(); // let state update

    expect(defaultProps.onClose).toBeCalledTimes(1);
    expect(() => getByTestId("menu")).toThrow();
  });
});
