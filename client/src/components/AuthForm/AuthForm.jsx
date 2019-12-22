import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./AuthForm.scss";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FacebookIcon from "@material-ui/icons/Facebook";

import GoogleIcon from "../../Img/g-logo.png";

export default function AuthForm() {
  const [form, setForm] = useState({
    email: null
  });

  const [formErrors, setFormErrors] = useState({
    email: null
  });

  function handleOnChange(e) {
    console.log(e.target.value);
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
    setFormErrors({
      ...formErrors,
      email: null
    });
  }

  return (
    <div className="Main">
      <form className="main-form" noValidate>
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
          margin="normal"
          label="Password"
          variant="outlined"
          helperText="This is a message"
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  {true ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          style={{ margin: "10px 0" }}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Login
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
// function handleSubmit(event) {
//     event.preventDefault();

//     let form = document.getElementsByClassName("main-form")[0];
//     let formData = new FormData(form);

//     fetch("/api/user/login", {
//       method: "POST",
//       body: formData,
//       credentials: "include"
//     }).then(res => {
//       if (res.status !== 404) {
//         this.setState({
//           login: true
//         });
//       } else {
//         this.setState({
//           error: true
//         });
//       }
//       form.reset();
//     });
//   }
// function loginAsGuest() {
//     this.props.dispatch(toggleGuestTrue());
//     this.setState({ login: true });
//   }
