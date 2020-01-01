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
        <SuspendTilUser>
          <Switch>
            <NoAuthRoute exact path="/" component={AuthPage} />
            <NoAuthRoute path="/signup" component={AuthPage} />
            <AuthRoute path="/dashboard" component={Dashboard} />
            <AuthRoute path="/classes" component={Classes} />
            <AuthRoute path="/tasks" component={Dashboard} />
            <AuthRoute path="/exams" component={Dashboard} />
            <AuthRoute path="/settings" component={Dashboard} />
            <Redirect to="/dashboard" />
          </Switch>
        </SuspendTilUser>
      </Router>
    </ThemeProvider>
  </Provider>
);

function SuspendTilUser({ children }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (!isAuthenticated) {
    return (
      <Backdrop style={{ zIndex: 99 }} open>
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }

  return children;
}

function AuthRoute(props) {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  if (!isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return <Route {...props} />;
}

function NoAuthRoute(props) {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return <Route {...props} />;
}

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
