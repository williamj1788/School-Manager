import React from 'react';
import '../styles/Main.scss';
import {Redirect, Link} from 'react-router-dom';

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           signIN: false, 
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event){
        event.preventDefault();
        this.setState({
            signIN: true,
        });
    }
    
    render(){
        if(this.state.signIN) return <Redirect to="/" />;
        
        return(
            <div className="Main">
                <form className="main-form" onSubmit={this.handleSubmit}>
                    <p className="form-title">School Manager</p>
                    <input type="text" className="input-field" name="username" placeholder="Username" autoComplete="off" />
                    <input type="password" className="input-field" name="password" placeholder="Password"/>
                    <button className="submit-button" type="submit">Sign Up</button>
                    <div className="account">
                        <p>Already have an account?</p>
                        <p>Login</p>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signup;