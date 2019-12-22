import React from "react";

import AuthForm from "./AuthForm";

import { render, fireEvent } from "@testing-library/react";

jest.mock("react-router-dom/Link");
jest.mock("react-router-dom/Redirect");

describe("AuthForm", () => {
  test("renders without cashing", () => {
    render(<AuthForm />);
  });

  test("email input should start empty with no errors", () => {
    const { getByText, getByLabelText } = render(<AuthForm />);

    expect(getByLabelText(/Email/i).value).toBeFalsy();
    expect(getByText(/Email/i).className.split(" ")).not.toContain("Mui-error");
  });

  test("email input should show error when missing email", () => {
    const { getByText, getByLabelText } = render(<AuthForm />);

    fireEvent.focus(getByLabelText(/Email/i));
    fireEvent.blur(getByLabelText(/Email/i));

    expect(getByText("Email is Required")).toBeTruthy();
    expect(getByText("Email is Required").className.split(" ")).toContain(
      "Mui-error"
    );
  });

  test("email input should remove error if value is valid", () => {
    const { getByLabelText, getByTestId } = render(<AuthForm />);
    getByLabelText(/Email/i).value = "";

    fireEvent.blur(getByLabelText(/Email/i));

    fireEvent.change(getByLabelText(/Email/i), {
      target: {
        value: "email@gmail.com"
      }
    });

    fireEvent.blur(getByLabelText(/Email/i));

    expect(getByTestId("Email").className.split(" ")).not.toContain(
      "Mui-error"
    );
  });
});
