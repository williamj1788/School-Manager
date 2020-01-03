import React from "react";
import { render } from "@testing-library/react";
import CreateClassForm from "./CreateClassForm";

describe("CreateClassForm", () => {
  test("should render without crashing", () => {
    render(<CreateClassForm open />);
  });
});
