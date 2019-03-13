import React from 'react';
import '../styles/Main.scss';

class Login extends React.Component{
    render(){
        return(
            <div className="Main">
                <form className="main-form">
                    <p className="form-title">School Manager</p>
                    <input type="text" className="input-field" name="username" placeholder="Username" autoComplete="off" />
                    <input type="password" className="input-field" name="password" placeholder="Password"/>
                    <button className="submit-button" type="submit">Login</button>
                    <div className="account">
                        <p>Don't have an account?</p>
                        <p>Sign up</p>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;