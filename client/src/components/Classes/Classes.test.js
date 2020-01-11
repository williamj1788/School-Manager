import React from "react";
import Classes from "./Classes";
import { renderWithRedux } from "../../testHelpers";

import { MemoryRouter, Route } from "react-router-dom";

const defaultInitialState = {
  user: {
    email: "email1@gmail.com"
  },
  classes: [
    {
      _id: "mock",
      name: "mockName",
      teacher: "mockTeacher",
      color: "#ff0000"
    }
  ]
};

describe("Classes", () => {
  test("should render without crashing", () => {
    renderWithRedux(
      <MemoryRouter>
        <Route path="*" render={props => <Classes {...props} />} />
      </MemoryRouter>,
      { initialState: defaultInitialState }
    );
  });
});
