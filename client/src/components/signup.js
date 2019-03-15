import React from 'react';
import '../styles/Main.scss';
import {Redirect, Link} from 'react-router-dom';

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           signIN: false,
           error: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event){
        event.preventDefault();
        
        let form = document.getElementsByClassName('main-form')[0];
        let formData = new FormData(form);
        
        fetch('http://localhost:8080/api/user',{
            method: 'POST',
            body: formData,
        })
        .then(res => {
            if(res.status !== 400){
                this.setState({
                    signIN: true,
                });
            }else{
                return res.json();
            }
        })
        .then(res => {
            if(res.error){
                this.setState({
                    error: res.error,
                });
                console.log(res.error);
            }
            form.reset();
        })
    }
    
    render(){
        if(this.state.signIN) return <Redirect to="/dashboard" />;
        
        return(
            <div className="Main">
                <form className="main-form" onSubmit={this.handleSubmit}>
                    <p className="form-title">School Manager</p>
                    <input type="text" className="input-field" name="username" placeholder="Username" autoComplete="off" minLength='3' required/>
                    <input type="password" className="input-field" name="password" placeholder="Password" minLength='3' required/>
                    <button className="submit-button" type="submit">Sign Up</button>
                    {this.state.error && <p className="error">{this.state.error}</p>}
                    <div className="account">
                        <p>Already have an account?</p>
                        <Link to="/" id="account-link">Login</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signup;