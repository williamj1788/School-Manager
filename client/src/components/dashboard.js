import React from 'react';
import {Redirect} from 'react-router-dom';
import '../styles/dashboard.scss';

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            username: '',
        }

        this.Signout = this.Signout.bind(this);
    }

    componentDidMount(){
        fetch('http://localhost:8080/api/user')
        .then(res => {
            if(res.status === 404){
                this.setState({
                    redirect: true,
                });
                return res;
            }else{
                return res.json();
            }
        })
        .then(res => {
            if(res.username){
                this.setState({
                    username: res.username,
                });
            }
        })
        .catch(err => {
            console.error(err);
        });;
    }

    Signout(){
        fetch('http://localhost:8080/api/user/signout')
        .then(() => {
            this.setState({
                redirect: true,
            });
        })
    }
    
    render(){
        if(this.state.redirect) return <Redirect to="/" />;
        return(
            <div id="dashboard">
                <nav>
                    <div id="nav-container">
                        <span id="nav-logo">School Handle</span>
                        <div id="links">
                            <p className="nav-link">Add Class</p>
                            <p className="nav-link" onClick={this.Signout}>Sign Out</p>
                            <p className="nav-user">{this.state.username}</p>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Dashboard;