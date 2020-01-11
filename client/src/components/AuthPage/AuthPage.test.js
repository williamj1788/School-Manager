import React from "react";
import AuthPage from "./AuthPage";
import { fireEvent, wait } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import axiosMock from "axios";

import { renderWithRedux } from "../../testHelpers";

jest.mock("axios");

beforeEach(() => {
  axiosMock.post.mockReset();
});

describe("AuthPage", () => {
  test("renders without cashing", () => {
    renderWithRedux(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>
    );
  });

  test.each(["login", "signup"])(
    "%s: should send send correct request to server and route page",
    async type => {
      axiosMock.post.mockResolvedValueOnce({
        data: {
          email: "email@gmail.com",
          classes: []
        }
      });

      let locationTest;
      let historyTest;
      const { getByLabelText, getByTestId } = renderWithRedux(
        <MemoryRouter>
          <Route
            path="*"
            render={props => {
              locationTest = props.location;
              historyTest = props.history;
              return <AuthPage {...props} />;
            }}
          />
        </MemoryRouter>
      );

      if (type === "signup") historyTest.push("/signup");

      fireEvent.change(getByLabelText(/Email/i), {
        target: { value: "email@gmail.com" }
      });

      fireEvent.change(getByLabelText(/^Password/i), {
        target: { value: "password1" }
      });

      if (type === "signup") {
        fireEvent.change(getByLabelText(/Confirm Password/i), {
          target: { value: "password1" }
        });
      }

      fireEvent.submit(getByTestId("form"));

      await wait();

      expect(axiosMock.post.mock.calls.length).toBe(1);
      expect(axiosMock.post.mock.calls[0][0]).toBe("/api/user/" + type);
      expect(axiosMock.post.mock.calls[0][1]).toEqual({
        email: "email@gmail.com",
        password: "password1"
      });

      expect(locationTest.pathname).toBe("/dashboard");
    }
  );

  test("should show an error when login request fails", async () => {
    axiosMock.post
      .mockRejectedValueOnce({
        response: {
          status: 404
        }
      })
      .mockRejectedValueOnce({
        response: {
          status: 409
        }
      })
      .mockRejectedValueOnce({
        response: {
          status: 500
        }
      })
      .mockRejectedValueOnce({});

    const { getByLabelText, getByTestId, getByText } = renderWithRedux(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "email@gmail.com" }
    });

    fireEvent.change(getByLabelText(/^Password/i), {
      target: { value: "password1" }
    });

    fireEvent.submit(getByTestId("form"));

    await wait(); // wait for api call

    expect(getByText("username or password is incorrect"));

    fireEvent.submit(getByTestId("form"));

    await wait(); // wait for api call

    expect(getByText("email is already taken"));

    fireEvent.submit(getByTestId("form"));

    await wait(); // wait for api call

    expect(getByText("Internal Server Error"));

    fireEvent.submit(getByTestId("form"));

    await wait(); // wait for api call

    expect(getByText("can't connect to network"));
  });
});
