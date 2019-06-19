import React from 'react';
import '../../styles/dashboard.scss';

import { Redirect } from 'react-router-dom';

import Navbar from './navbar';
import AddClass from './Add/addClass';
import ClassDetail from './classDetail';
import ClassItem from './classItem';

import { connect } from "react-redux";
import { loadUser, setClassIndex, toggleGuestFalse } from '../../redux/action';

const mapStateToProps = state => {
    return { classes: state.classes, isGuess: state.isGuess };
}; 

export class Dashboard extends React.Component{
    state = {
        ShowAddClass: false,
        ShowClassDetail: false,
        redirectToLogin: false,
        loading: true,
    }

    // returns promise for testing proposes
    componentDidMount(){
        if(!this.props.isGuess){
            return this.getUserData()
            .then(user => {
                if(user){
                    this.loadUserData(user);
                }else{
                    this.redirectToLogin();
                }
            });
        }else{
            this.setState({loading: false});
        }
    }

    getUserData = () =>{
       return fetch('/api/user',{
            credentials: 'include'
        })
        .then(res => res.status === 404 ? null : res.json())
    }

    loadUserData = user =>{
        this.props.dispatch(loadUser(user))
        this.setState({
            loading: false,
        });
    }

    signOut = () =>{
        this.props.dispatch(toggleGuestFalse());
        return this.sendSignRequest()
        .then(this.redirectToLogin);
    }
    sendSignRequest = () => {
        return fetch('/api/user/signout',{
            credentials: 'include'
        })
    }

    redirectToLogin = () =>{
        this.setState({
            redirectToLogin: true,
        });
    }

    toggleShowClassDetail = index =>{
        this.setState({
            ShowClassDetail: !this.state.ShowClassDetail,
        });
        if(typeof index === 'number'){
            this.props.dispatch(setClassIndex(index || 0));
        } 
    }

    toggleShowAddClass = () =>{
        this.setState({
            ShowAddClass: !this.state.ShowAddClass,
        });
    }
    
    render(){

        if(this.state.redirectToLogin){
            return <Redirect to="/" />;
        }
        // set id of div to loading for testing purposes
        if(this.state.loading){
            return <div id="loading">Loading</div>
        }
        let { classes } = this.props;
        classes = classes.map((Class, index) => {
            return <ClassItem item={Class} onClick={() => this.toggleShowClassDetail(index)} key={index}/>;
        });
        
        return(
            <div>
                <div id="dashboard">
                    <Navbar toggle={this.toggleShowAddClass} signOut={this.signOut} />
                    <div id="class-container">
                        {classes}
                    </div>
                </div>
                {this.state.ShowAddClass && <AddClass toggle={this.toggleShowAddClass}/>}
                {this.state.ShowClassDetail && <ClassDetail toggle={this.toggleShowClassDetail}/>}
            </div>
        )
    }
}
export default connect(mapStateToProps)(Dashboard);