import React from 'react';
import {Redirect} from 'react-router-dom';

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
        this.Signout = this.Signout.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    
    Signout(){
        fetch('http://localhost:8080/api/user/signout',{
            credentials: 'include'
        })
        .then(() => {
            this.setState({
                redirect: true,
            });
        })
    }
    toggle(){
        this.props.toggle();
    }
    
    render(){
        if(!this.props.loading && (this.state.redirect || !this.props.username)){
            return <Redirect to="/" />;
        }
        return(
            <nav>
                <div id="nav-container">
                    <span id="nav-logo">School Handle</span>
                    <div id="links">
                        <p className="nav-link" onClick={this.toggle}>Add Class</p>
                        <p className="nav-link" onClick={this.Signout}>Sign Out</p>
                        <p className="nav-user">{this.props.username}</p>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;