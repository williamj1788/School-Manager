import React from "react";
import { Redirect, Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FacebookIcon from "@material-ui/icons/Facebook";

import { connect } from "react-redux";
import { toggleGuestTrue } from "../redux/action";

import GoogleIcon from "../Img/g-logo.png";

export class Login extends React.Component {
  state = {
    login: false,
    error: false
  };

  handleSubmit = event => {
    event.preventDefault();

    let form = document.getElementsByClassName("main-form")[0];
    let formData = new FormData(form);

    fetch("/api/user/login", {
      method: "POST",
      body: formData,
      credentials: "include"
    }).then(res => {
      if (res.status !== 404) {
        this.setState({
          login: true
        });
      } else {
        this.setState({
          error: true
        });
      }
      form.reset();
    });
  };

  loginAsGuest = () => {
    this.props.dispatch(toggleGuestTrue());
    this.setState({ login: true });
  };

  render() {
    if (this.state.login) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Paper className="Main">
        <form className="main-form" noValidate onSubmit={this.handleSubmit}>
          <h2 className="form-title">StudyBit</h2>
          <TextField
            margin="normal"
            label="Email"
            variant="outlined"
            helperText="This is a message"
            fullWidth
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
              backgroundColor: "#4285F4"
            }}
            variant="contained"
            color="primary"
            fullWidth
          >
            <img
              src={GoogleIcon}
              alt="Google Logo"
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
      </Paper>
    );
  }
}
export default connect()(Login);
