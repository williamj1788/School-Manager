import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./redux/store";
import { fetchUser } from "./redux/action";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { ThemeProvider } from "@material-ui/core/styles";

import "./styles/Normalize.css";
import "./styles/index.scss";

import AuthPage from "./components/AuthPage/AuthPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Classes from "./components/Classes/Classes";

const Root = ({ store }) => (
  <Provider store={store}>
    <ThemeProvider>
      <Router>
        <div>
          <Switch>
            <AuthRoute exact path="/" component={AuthPage} />
            <AuthRoute path="/signup" component={AuthPage} />
            <AuthRoute path="/dashboard" component={Dashboard} />
            <AuthRoute path="/classes" component={Classes} />
            <AuthRoute path="/tasks" component={Dashboard} />
            <AuthRoute path="/exams" component={Dashboard} />
            <AuthRoute path="/settings" component={Dashboard} />
            <Redirect to="/dashboard" />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  </Provider>
);

function AuthRoute(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (!user.isAuthenticated)
    return (
      <Backdrop style={{ zIndex: 99 }} open>
        <CircularProgress color="primary" />
      </Backdrop>
    );
  return <Route {...props} />;
}

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
