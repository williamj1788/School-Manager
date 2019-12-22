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

    fireEvent.blur(getByLabelText(/Email/i));

    expect(getByText("Email is Required")).toBeTruthy();
    expect(getByText("Email is Required").className.split(" ")).toContain(
      "Mui-error"
    );
  });

  test("email input should show error when email is invalid", () => {
    const { getByText, getByLabelText } = render(<AuthForm />);

    fireEvent.change(getByLabelText(/Email/i), {
      target: {
        value: "invalidEmail.com"
      }
    });

    fireEvent.blur(getByLabelText(/Email/i));

    expect(getByText("Email is Invalid")).toBeTruthy();
    expect(getByText("Email is Invalid").className.split(" ")).toContain(
      "Mui-error"
    );
  });

  test("email input should remove error if value is valid", () => {
    const { getByLabelText, getByTestId } = render(<AuthForm />);

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

  test("password input should start empty with no errors", () => {
    const { getByText, getByLabelText } = render(<AuthForm />);

    expect(getByLabelText(/Password/i).value).toBeFalsy();
    expect(getByText(/Password/i).className.split(" ")).not.toContain(
      "Mui-error"
    );
  });

  test("password input should show error when password is missing", () => {
    const { getByText, getByLabelText } = render(<AuthForm />);

    fireEvent.blur(getByLabelText(/Password/i));

    expect(getByText("Password is Required")).toBeTruthy();
    expect(getByText("Password is Required").className.split(" ")).toContain(
      "Mui-error"
    );
  });

  test("password input should remove error if value is valid", () => {
    const { getByLabelText, getByTestId } = render(<AuthForm />);

    fireEvent.blur(getByLabelText(/Password/i));

    fireEvent.change(getByLabelText(/Password/i), {
      target: {
        value: "password1"
      }
    });

    fireEvent.blur(getByLabelText(/Password/i));

    expect(getByTestId("Password").className.split(" ")).not.toContain(
      "Mui-error"
    );
  });
});
