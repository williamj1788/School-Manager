import React from "react";

import AuthForm from "./AuthForm";

import { render, fireEvent } from "@testing-library/react";
// import MockLink from "react-router-dom/Link";

jest.mock("react-router-dom/Link");

jest.mock("react-router-dom/Redirect");

describe("AuthForm", () => {
  test("renders without cashing", () => {
    render(<AuthForm />);
  });
});
