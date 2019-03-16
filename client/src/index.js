import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch,BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import './styles/Normalize.css';

import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        </Router>
    </Provider>
)

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

