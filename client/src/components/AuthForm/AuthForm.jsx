import React, { useState, useEffect } from "react";
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

export default function AuthForm({ onSubmit, pending }) {
  const [form, setForm] = useState({
    email: null,
    password: null
  });
  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null
  });
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  useEffect(() => {
    if (!isSubmiting) {
      return;
    }
    setIsSubmiting(false);
    if (formErrors.email || formErrors.password) {
      return;
    }
    onSubmit(form);
  }, [isSubmiting]);

  function handleOnChange(e) {
    setForm({
      ...form,
      [e.target.id.toLowerCase()]: e.target.value
    });
  }

  function validateEmail() {
    if (!form.email) {
      return setFormErrors({
        ...formErrors,
        email: "Email is Required"
      });
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailRegex.test(form.email)) {
      return setFormErrors({
        ...formErrors,
        email: "Email is Invalid"
      });
    }
    setFormErrors({
      ...formErrors,
      email: null
    });
  }

  function validatePassword() {
    if (!form.password) {
      return setFormErrors({
        ...formErrors,
        password: "Password is Required"
      });
    }
    if (form.password.length < 6) {
      return setFormErrors({
        ...formErrors,
        password: "Password must have at least 6 characters"
      });
    }
    setFormErrors({
      ...formErrors,
      password: null
    });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    setIsSubmiting(true);

    validateEmail();
    validatePassword();
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
          margin="normal"
          label="Email"
          id="Email"
          variant="outlined"
          helperText={formErrors.email}
          fullWidth
          onChange={handleOnChange}
          onBlur={validateEmail}
          required
        />
        <TextField
          InputLabelProps={{ "data-testid": "Password" }}
          error={!!formErrors.password}
          margin="normal"
          label="Password"
          id="Password"
          variant="outlined"
          helperText={formErrors.password}
          onChange={handleOnChange}
          onBlur={validatePassword}
          type={visiblePassword ? "text" : "password"}
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
          ) : (
            "Login"
          )}
        </Button>
        <Divider />
        <Button
          style={{
            margin: "10px 0",
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
          style={{ margin: "10px 0", position: "relative" }}
          variant="contained"
          color="primary"
          fullWidth
        >
          <FacebookIcon
            style={{ fontSize: 30, position: "absolute", left: 10 }}
          />
          Login with Facebook
        </Button>
        <Button
          style={{ margin: "10px 0" }}
          variant="contained"
          color="primary"
          fullWidth
        >
          Login As Guest
        </Button>
        <div className="account">
          <Link to="/signup" id="account-link">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
