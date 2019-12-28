import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import { ThemeProvider } from "@material-ui/core/styles";

import "./styles/Normalize.css";
import "./styles/index.scss";

import AuthPage from "./components/AuthPage/AuthPage";
import Dashboard from "./components/Dashboard/Dashboard";

const Root = ({ store }) => (
  <Provider store={store}>
    <ThemeProvider>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={AuthPage} />
            <Route path="/signup" component={AuthPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/classes" component={Dashboard} />
            <Route path="/tasks" component={Dashboard} />
            <Route path="/exams" component={Dashboard} />
            <Route path="/settings" component={Dashboard} />
            <Redirect to="/dashboard" />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
