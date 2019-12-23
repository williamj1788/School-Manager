import React from "react";
import AuthPage from "./AuthPage";
import { render, fireEvent, wait } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import axiosMock from "axios";

jest.mock("axios");

describe("AuthPage", () => {
  test("renders without cashing", () => {
    render(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>
    );
  });

  test("should send login request to server", async () => {
    axiosMock.post.mockResolvedValue();

    let locationTest;
    const { getByLabelText, getByTestId } = render(
      <MemoryRouter>
        <Route
          path="*"
          render={({ history, location }) => {
            locationTest = location;
            return <AuthPage history={history} />;
          }}
        />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "email@gmail.com" }
    });

    fireEvent.change(getByLabelText(/Password/i), {
      target: { value: "password1" }
    });

    fireEvent.submit(getByTestId("form"));

    await wait();

    expect(axiosMock.post.mock.calls.length).toBe(1);
    expect(axiosMock.post.mock.calls[0][0]).toBe("/api/user/login");
    expect(axiosMock.post.mock.calls[0][1]).toEqual({
      email: "email@gmail.com",
      password: "password1"
    });

    expect(locationTest.pathname).toBe("/dashboard");
  });

  test("should show an error when login request fails", async () => {
    axiosMock.post
      .mockRejectedValueOnce({
        response: {
          status: 404
        }
      })
      .mockRejectedValueOnce({
        response: {
          status: 500
        }
      })
      .mockRejectedValueOnce({});

    const { getByLabelText, getByTestId, getByText } = render(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "email@gmail.com" }
    });

    fireEvent.change(getByLabelText(/Password/i), {
      target: { value: "password1" }
    });

    fireEvent.submit(getByTestId("form"));

    await wait(); // wait for api call

    expect(getByText("username or password is incorrect"));

    fireEvent.submit(getByTestId("form"));

    await wait(); // wait for api call

    expect(getByText("Internal Server Error"));

    fireEvent.submit(getByTestId("form"));

    await wait(); // wait for api call

    expect(getByText("can't connect to network"));
  });
});
