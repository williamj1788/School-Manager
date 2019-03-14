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
        
        let form = document.getElementsByClassName('main-form')[0];
        let formData = new FormData(form);
        
        fetch('http://localhost:8080/api/user',{
            method: 'POST',
            body: formData,
            mode: "cors",
        })
        .then(res => console.log(res))
        // .then(res => res.json())
        // .then(res => console.log(res))
        // .then(() => {
        //     this.setState({
        //         signIN: true,
        //     }); 
        // })
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