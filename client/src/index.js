import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch,BrowserRouter as Router } from 'react-router-dom';

import './styles/Normalize.css';

import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/dashboard" component={Dashboard} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

