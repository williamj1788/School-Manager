import React, { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function AuthPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [pending, setPending] = useState(false);
  const history = useHistory();
  async function onSubmit(form) {
    setPending(true);
    try {
      const res = await axios.post("/api/user/login", form);
      history.push("dashboard");
    } catch (err) {
      if (!err.response) {
        return setErrorMessage("can't connect to network");
      }
      if (err.response.status === 404) {
        setErrorMessage("username or password is incorrect");
      } else if (err.response.status === 500) {
        setErrorMessage("Internal Server Error");
      }
    } finally {
      setPending(false);
    }
  }
  return (
    <AuthForm onSubmit={onSubmit} error={errorMessage} pending={pending} />
  );
}
