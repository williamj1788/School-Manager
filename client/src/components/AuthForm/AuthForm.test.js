import React from "react";

import AuthForm from "./AuthForm";

import { render, fireEvent, act } from "@testing-library/react";

jest.mock("react-router-dom");

describe("AuthForm", () => {
  test("renders without cashing", () => {
    render(<AuthForm />);
  });
  test("should call onSubmit on submit", () => {
    const onSubmit = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <AuthForm onSubmit={onSubmit} />
    );

    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "email@gmail.com" }
    });

    fireEvent.change(getByLabelText(/Password/i), {
      target: { value: "password1" }
    });

    act(() => {
      fireEvent.submit(getByTestId("form"));
    });

    expect(onSubmit.mock.calls.length).toBe(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: "email@gmail.com",
      password: "password1"
    });
  });

  test("should not call onSubmit on submit when form is invalid", () => {
    const onSubmit = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <AuthForm onSubmit={onSubmit} />
    );

    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "email" }
    });

    fireEvent.change(getByLabelText(/Password/i), {
      target: { value: "pass" }
    });

    fireEvent.submit(getByTestId("form"));

    expect(onSubmit.mock.calls.length).toBe(0);
  });

  test("should show spinner when pending", () => {
    const { getByTestId, rerender, queryByTestId } = render(
      <AuthForm pending />
    );

    expect(getByTestId("submit button").disabled).toBeTruthy();
    expect(getByTestId("spinner")).toBeTruthy();

    rerender(<AuthForm />);

    expect(getByTestId("submit button").disabled).toBeFalsy();
    expect(queryByTestId("spinner")).toBeFalsy();
  });

  test("should show error message when error prop is set", () => {
    const { getByText } = render(<AuthForm error="this is a error message" />);

    expect(getByText("this is a error message")).toBeTruthy();
  });
  describe("email input", () => {
    test("should start empty with no errors", () => {
      const { getByText, getByLabelText } = render(<AuthForm />);

      expect(getByLabelText(/Email/i).value).toBeFalsy();
      expect(getByText(/Email/i).className.split(" ")).not.toContain(
        "Mui-error"
      );
    });

    test("should show error when missing email", () => {
      const { getByText, getByLabelText } = render(<AuthForm />);

      fireEvent.blur(getByLabelText(/Email/i));

      expect(getByText("Email is Required")).toBeTruthy();
      expect(getByText("Email is Required").className.split(" ")).toContain(
        "Mui-error"
      );
    });

    test("should show error when email is invalid", () => {
      const { getByText, getByLabelText } = render(<AuthForm />);

      fireEvent.change(getByLabelText(/Email/i), {
        target: { value: "invalidEmail.com" }
      });

      fireEvent.blur(getByLabelText(/Email/i));

      expect(getByText("Email is Invalid")).toBeTruthy();
      expect(getByText("Email is Invalid").className.split(" ")).toContain(
        "Mui-error"
      );
    });

    test("should remove error if value is valid", () => {
      const { getByLabelText, getByTestId } = render(<AuthForm />);

      fireEvent.blur(getByLabelText(/Email/i));

      fireEvent.change(getByLabelText(/Email/i), {
        target: { value: "email@gmail.com" }
      });

      fireEvent.blur(getByLabelText(/Email/i));

      expect(getByTestId("Email").className.split(" ")).not.toContain(
        "Mui-error"
      );
    });
  });

  describe("password input", () => {
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

    test("password input should show error when password has less than 6 characters", () => {
      const { getByText, getByLabelText } = render(<AuthForm />);

      fireEvent.change(getByLabelText(/Password/i), {
        target: { value: "foooo" }
      });

      fireEvent.blur(getByLabelText(/Password/i));

      expect(
        getByText("Password must have at least 6 characters")
      ).toBeTruthy();
      expect(
        getByText("Password must have at least 6 characters").className.split(
          " "
        )
      ).toContain("Mui-error");
    });

    test("password input should remove error if value is valid", () => {
      const { getByLabelText, getByTestId } = render(<AuthForm />);

      fireEvent.blur(getByLabelText(/Password/i));

      fireEvent.change(getByLabelText(/Password/i), {
        target: { value: "password1" }
      });

      fireEvent.blur(getByLabelText(/Password/i));

      expect(getByTestId("Password").className.split(" ")).not.toContain(
        "Mui-error"
      );
    });

    test("password input value's should be able to toggle visibility", () => {
      const { queryByTestId, getByTestId, getByLabelText } = render(
        <AuthForm />
      );

      expect(queryByTestId("visible")).toBeFalsy();
      expect(queryByTestId("not visible")).toBeTruthy();
      expect(getByLabelText(/Password/i).type).toBe("password");

      fireEvent.click(getByTestId("visible button"));

      expect(queryByTestId("visible")).toBeTruthy();
      expect(queryByTestId("not visible")).toBeFalsy();
      expect(getByLabelText(/Password/i).type).toBe("text");

      fireEvent.click(getByTestId("visible button"));

      expect(queryByTestId("visible")).toBeFalsy();
      expect(queryByTestId("not visible")).toBeTruthy();
      expect(getByLabelText(/Password/i).type).toBe("password");
    });
  });

  test("password input should start empty with no errors", () => {
    const { getByText, getByLabelText } = render(<AuthForm />);

    expect(getByLabelText(/Password/i).value).toBeFalsy();
    expect(getByText(/Password/i).className.split(" ")).not.toContain(
      "Mui-error"
    );
  });
});
