import React from 'react';
import '../styles/Main.scss';
import {Redirect, Link} from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           login: false, 
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        this.setState({
            login: true,
        });
    }
    
    render(){
        if(this.state.login) return <Redirect to="/dashboard" />;
        return(
            <div className="Main">
                <form className="main-form" onSubmit={this.handleSubmit}>
                    <p className="form-title">School Manager</p>
                    <input type="text" className="input-field" name="username" placeholder="Username" autoComplete="off" />
                    <input type="password" className="input-field" name="password" placeholder="Password"/>
                    <button className="submit-button" type="submit">Login</button>
                    <div className="account">
                        <p>Don't have an account?</p>
                        <Link to="/signup" id="account-link">Sign up</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;