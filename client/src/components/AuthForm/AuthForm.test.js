import React from "react";

import AuthForm from "./AuthForm";

import { render, fireEvent } from "@testing-library/react";

describe("AuthForm", () => {
  test("renders without cashing", () => {
    render(<AuthForm />);
  });
});
