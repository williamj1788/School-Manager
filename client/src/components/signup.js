import React from "react";
import { Redirect, Link } from "react-router-dom";

export class Signup extends React.Component {
  state = {
    signIN: false,
    error: false
  };

  handleSubmit = event => {
    event.preventDefault();

    let form = document.getElementsByClassName("main-form")[0];
    let formData = new FormData(form);

    fetch("/api/user/signup", {
      method: "POST",
      body: formData,
      credentials: "include"
    }).then(res => {
      if (res.status !== 400) {
        this.setState({
          signIN: true
        });
      } else {
        this.setState({
          error: true
        });
      }
      form.reset();
    });
  };

  render() {
    if (this.state.signIN) return <Redirect to="/dashboard" />;

    return (
      <div className="Main">
        <form className="main-form" onSubmit={this.handleSubmit}>
          <p className="form-title">StudyBit</p>
          <input
            type="text"
            className="input-field"
            name="username"
            placeholder="Username"
            autoComplete="off"
            minLength="3"
            required
          />
          <input
            type="password"
            className="input-field"
            name="password"
            placeholder="Password"
            minLength="3"
            required
          />
          <button className="submit-button" type="submit">
            Sign Up
          </button>
          {this.state.error && <p className="error">Username already taken</p>}
          <div className="account">
            <p>Already have an account?</p>
            <Link to="/" id="account-link">
              Login
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
