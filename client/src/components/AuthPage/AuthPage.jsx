import React, { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function AuthPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [pending, setPending] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  const type = location.pathname === "/signup" ? "signup" : "login";

  async function onSubmit(form) {
    setPending(true);
    try {
      const { data } = await axios.post("/api/user/" + type, form);
      dispatch({ type: "FETCH_USER", payload: data });
      history.push("dashboard");
    } catch (err) {
      if (!err.response) {
        return setErrorMessage("can't connect to network");
      }
      if (err.response.status === 404) {
        setErrorMessage("username or password is incorrect");
      } else if (err.response.status === 409) {
        setErrorMessage("email is already taken");
      } else {
        setErrorMessage("Internal Server Error");
      }
    } finally {
      setPending(false);
    }
  }
  return (
    <AuthForm
      onSubmit={onSubmit}
      error={errorMessage}
      pending={pending}
      type={type}
    />
  );
}
