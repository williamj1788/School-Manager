import React from "react";
import AuthForm from "../AuthForm/AuthForm";

export default function AuthPage() {
  function onSubmit(form) {
    console.log(form);
  }
  return <AuthForm onSubmit={onSubmit} />;
}
