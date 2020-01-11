import React from "react";

import AuthForm from "./AuthForm";

import { render, fireEvent, act } from "@testing-library/react";

jest.mock("react-router-dom");

describe("AuthForm", () => {
  test("renders without cashing", () => {
    render(<AuthForm />);
  });
  test("should call #onSubmit on submit when form is valid", () => {
    const onSubmit = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <AuthForm onSubmit={onSubmit} type="signup" />
    );

    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "email@gmail.com" }
    });

    fireEvent.change(getByLabelText(/^Password/i), {
      target: { value: "password1" }
    });

    fireEvent.change(getByLabelText(/Confirm Password/i), {
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

  test("should not call #onSubmit on submit when form is invalid", () => {
    const onSubmit = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <AuthForm onSubmit={onSubmit} type="signup" />
    );

    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "email" }
    });

    fireEvent.change(getByLabelText(/^Password/i), {
      target: { value: "pass" }
    });

    fireEvent.change(getByLabelText(/Confirm Password/i), {
      target: { value: "passqq" }
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

  describe.each([
    [/Email/i, "Email is Required"],
    [/^Password/i, "Password is Required"],
    [/Confirm Password/i, "please enter password again"]
  ])("%s input", (labelRegex, requiredText) => {
    test("should start empty with no errors", () => {
      const { getByText, getByLabelText } = render(<AuthForm type="signup" />);

      expect(getByLabelText(labelRegex).value).toBeFalsy();
      expect(getByText(labelRegex).className.split(" ")).not.toContain(
        "Mui-error"
      );
    });

    test("should show error when missing value", () => {
      const { getByText, getByLabelText } = render(<AuthForm type="signup" />);

      fireEvent.blur(getByLabelText(labelRegex));

      expect(getByText(requiredText)).toBeTruthy();
      expect(getByText(requiredText).className.split(" ")).toContain(
        "Mui-error"
      );
    });
  });

  test("hide password iconButton should toggle password input type", () => {
    const { getByLabelText, getByTestId } = render(<AuthForm type="signup" />);
    const iconButton = getByTestId("visible button");

    const passwordElement = getByLabelText(/^Password/i);
    const confirmPasswordElement = getByLabelText(/Confirm Password/i);

    expect(passwordElement.type).toBe("password");
    expect(confirmPasswordElement.type).toBe("password");

    fireEvent.click(iconButton);

    expect(passwordElement.type).toBe("text");
    expect(confirmPasswordElement.type).toBe("text");
  });

  describe("email input", () => {
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
    test("should show error when password has less than 6 characters", () => {
      const { getByText, getByLabelText } = render(<AuthForm />);

      fireEvent.change(getByLabelText(/^Password/i), {
        target: { value: "foooo" }
      });

      fireEvent.blur(getByLabelText(/^Password/i));

      expect(
        getByText("Password must have at least 6 characters")
      ).toBeTruthy();
      expect(
        getByText("Password must have at least 6 characters").className.split(
          " "
        )
      ).toContain("Mui-error");
    });

    test("should remove error if value is valid", () => {
      const { getByLabelText, getByTestId } = render(<AuthForm />);

      fireEvent.blur(getByLabelText(/^Password/i));

      fireEvent.change(getByLabelText(/^Password/i), {
        target: { value: "password1" }
      });

      fireEvent.blur(getByLabelText(/^Password/i));

      expect(getByTestId("Password").className.split(" ")).not.toContain(
        "Mui-error"
      );
    });

    test("values should be able to toggle visibility", () => {
      const { queryByTestId, getByTestId, getByLabelText } = render(
        <AuthForm />
      );

      expect(queryByTestId("visible")).toBeFalsy();
      expect(queryByTestId("not visible")).toBeTruthy();
      expect(getByLabelText(/^Password/i).type).toBe("password");

      fireEvent.click(getByTestId("visible button"));

      expect(queryByTestId("visible")).toBeTruthy();
      expect(queryByTestId("not visible")).toBeFalsy();
      expect(getByLabelText(/^Password/i).type).toBe("text");

      fireEvent.click(getByTestId("visible button"));

      expect(queryByTestId("visible")).toBeFalsy();
      expect(queryByTestId("not visible")).toBeTruthy();
      expect(getByLabelText(/^Password/i).type).toBe("password");
    });
  });

  describe("confirm password input ", () => {
    test("should show based on type", () => {
      const {
        getByLabelText,
        queryByLabelText,
        rerender,
        getByText,
        queryByText
      } = render(<AuthForm type="signup" />);

      expect(getByLabelText(/Confirm Password/i));
      expect(getByText("Sign Up"));

      rerender(<AuthForm />);

      expect(queryByLabelText(/Confirm Password/i)).toBeFalsy();
      expect(queryByText("Sign Up")).toBeFalsy();
    });

    test("should show error when value and password don't match", () => {
      const { getByLabelText, getByText } = render(<AuthForm type="signup" />);

      fireEvent.change(getByLabelText(/^Password/i), {
        target: { value: "password1" }
      });

      fireEvent.change(getByLabelText(/Confirm Password/i), {
        target: { value: "pasdfsdfs1" }
      });

      fireEvent.blur(getByLabelText(/Confirm Password/i));

      expect(getByText("must match password")).toBeTruthy();
      expect(getByText("must match password").className.split(" ")).toContain(
        "Mui-error"
      );
    });

    test("should remove error if value is valid", () => {
      const { getByLabelText, getByTestId } = render(
        <AuthForm type="signup" />
      );

      fireEvent.blur(getByLabelText(/Confirm Password/i));

      fireEvent.change(getByLabelText(/^Password/i), {
        target: { value: "password1" }
      });

      fireEvent.change(getByLabelText(/Confirm Password/i), {
        target: { value: "password1" }
      });

      fireEvent.blur(getByLabelText(/Confirm Password/i));

      expect(getByTestId("Password").className.split(" ")).not.toContain(
        "Mui-error"
      );
    });
  });
});
