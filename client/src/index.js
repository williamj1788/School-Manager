import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch,BrowserRouter as Router } from 'react-router-dom';

import Login from './components/login';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Login} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

