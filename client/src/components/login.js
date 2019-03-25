import React from 'react';
import '../styles/Main.scss';
import {Redirect, Link} from 'react-router-dom';

import { connect } from "react-redux";


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           login: false,
           error: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event){
        event.preventDefault();
        console.log('User Login');
        
        let form = document.getElementsByClassName('main-form')[0];
        let formData = new FormData(form);
        
        fetch('http://localhost:8080/api/user/login',{
            method: 'POST',
            body: formData,
            credentials: 'include',
        })
        .then(res => {
            if(res.status !== 404){
                this.setState({
                    login: true,
                });
            }else{
                this.setState({
                    error: true,
                });
            }
            form.reset();
        })
    }
    
    render(){
        if(this.state.login) {return <Redirect to="/dashboard" />};
        return(
            <div className="Main">
                <form className="main-form" onSubmit={this.handleSubmit}>
                    <p className="form-title">School Manager</p>
                    <input type="text" className="input-field" name="username" placeholder="Username" autoComplete="off" />
                    <input type="password" className="input-field" name="password" placeholder="Password"/>
                    <button className="submit-button" type="submit">Login</button>
                    {this.state.error && <p className="error">Username or Password is wrong</p>}
                    <div className="account">
                        <p>Don't have an account?</p>
                        <Link to="/signup" id="account-link">Sign up</Link>
                    </div>
                </form>
            </div>
        )
    }
}
Login = connect()(Login);
export default Login;