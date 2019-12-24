import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./AuthForm.scss";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FacebookIcon from "@material-ui/icons/Facebook";

import GoogleIcon from "../../Img/g-logo.png";

export default function AuthForm({ onSubmit, pending, error, type }) {
  const [form, setForm] = useState({
    email: null,
    password: null,
    confirmPassword: null
  });
  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
    confirmPassword: null
  });
  const [visiblePassword, setVisiblePassword] = useState(false);

  function handleOnChange(e) {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  }

  function validateForm() {
    setFormErrors({
      password: getPasswordValidationError(),
      email: getEmailValidationError(),
      confirmPassword: getConfirmPasswordValidationError()
    });
  }

  function validateInput(input) {
    setFormErrors({
      ...formErrors,
      [input]: getInputValidationError()
    });

    function getInputValidationError() {
      switch (input) {
        case "email":
          return getEmailValidationError();
        case "password":
          return getPasswordValidationError();
        case "confirmPassword":
          return getConfirmPasswordValidationError();
        default:
          return "";
      }
    }
  }

  function getEmailValidationError() {
    if (!form.email) {
      return "Email is Required";
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(form.email)) {
      return "Email is Invalid";
    }
    return null;
  }

  function getPasswordValidationError() {
    if (!form.password) {
      return "Password is Required";
    }
    if (form.password.length < 6) {
      return "Password must have at least 6 characters";
    }
    return null;
  }

  function getConfirmPasswordValidationError() {
    if (!form.confirmPassword) {
      return "please enter password again";
    }

    if (form.password !== form.confirmPassword) {
      return "must match password";
    }

    return null;
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    if (
      getEmailValidationError() ||
      getPasswordValidationError() ||
      (type === "signup" && getConfirmPasswordValidationError())
    ) {
      return validateForm();
    }

    const { email, password } = form;
    onSubmit({ email, password });
  }

  return (
    <div className="Main">
      <form
        className="main-form"
        noValidate
        data-testid="form"
        onSubmit={handleOnSubmit}
      >
        <h2 className="form-title">StudyBit</h2>
        <TextField
          InputLabelProps={{ "data-testid": "Email" }}
          error={!!formErrors.email}
          margin="dense"
          label="Email"
          id="email"
          variant="outlined"
          helperText={formErrors.email}
          fullWidth
          onChange={handleOnChange}
          onBlur={() => validateInput("email")}
          size="small"
          required
        />
        <TextField
          InputLabelProps={{ "data-testid": "Password" }}
          error={!!formErrors.password}
          margin="dense"
          label="Password"
          id="password"
          variant="outlined"
          helperText={formErrors.password}
          onChange={handleOnChange}
          onBlur={() => validateInput("password")}
          type={visiblePassword ? "text" : "password"}
          size="small"
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  data-testid="visible button"
                  onClick={() => setVisiblePassword(p => !p)}
                >
                  {visiblePassword ? (
                    <Visibility data-testid="visible" />
                  ) : (
                    <VisibilityOff data-testid="not visible" />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {type === "signup" && (
          <TextField
            InputLabelProps={{ "data-testid": "Confirm Password" }}
            error={!!formErrors.confirmPassword}
            margin="dense"
            label="Confirm Password"
            id="confirmPassword"
            variant="outlined"
            helperText={formErrors.confirmPassword}
            onChange={handleOnChange}
            onBlur={() => validateInput("confirmPassword")}
            type={visiblePassword ? "text" : "password"}
            size="small"
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    data-testid="visible button C"
                    onClick={() => setVisiblePassword(p => !p)}
                  >
                    {visiblePassword ? (
                      <Visibility data-testid="visible C" />
                    ) : (
                      <VisibilityOff data-testid="not visible C" />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        )}
        {error && <p className="form-error">{error}</p>}
        <Button
          style={{ margin: "10px 0" }}
          variant="contained"
          data-testid="submit button"
          color="primary"
          type="submit"
          fullWidth
          disabled={pending}
        >
          {pending ? (
            <CircularProgress data-testid="spinner" size={25} />
          ) : type === "signup" ? (
            "Sign Up"
          ) : (
            "Login"
          )}
        </Button>
        <Divider />
        <Divider />
        <Divider />
        <Button
          style={{
            margin: "20px 0 10px 0",
            position: "relative",
            color: "#333332",
            backgroundColor: "#ffffff"
          }}
          variant="contained"
          fullWidth
        >
          <img
            src={GoogleIcon}
            alt="Google Logo"
            width="30"
            height="30"
            style={{ fontSize: 30, position: "absolute", left: 10 }}
          />
          Login with Google
        </Button>
        <Button
          style={{ margin: "10px 0 20px 0", position: "relative" }}
          variant="contained"
          color="primary"
          fullWidth
        >
          <FacebookIcon
            style={{ fontSize: 30, position: "absolute", left: 10 }}
          />
          Login with Facebook
        </Button>
        <Divider />
        <Divider />
        <Divider />
        <Button
          style={{ margin: "20px 0 10px 0" }}
          variant="contained"
          color="primary"
          fullWidth
        >
          Login As Guest
        </Button>
        <div className="account">
          <Link to={type === "signup" ? "/" : "/signup"} id="account-link">
            {type === "signup"
              ? "Already have an account? Log in"
              : "Don't have an account? Sign Up"}
          </Link>
        </div>
      </form>
    </div>
  );
}
