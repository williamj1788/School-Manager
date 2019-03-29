import React from 'react';
import '../../styles/dashboard.scss';

import { Redirect } from 'react-router-dom';

import Navbar from './navbar';
import AddClass from './Add/addClass';
import ClassDetail from './classDetail';
import ClassItem from './classItem';

import { connect } from "react-redux";
import { loadUser, setClassIndex } from '../../redux/action';

const mapStateToProps = state => {
    return { classes: state.classes };
}; 

export class Dashboard extends React.Component{
    state = {
        ShowAddClass: false,
        ShowClassDetail: false,
        redirect: false,
        loading: true,
    }

    componentDidMount(){
       
        this.getUserData()
        .then(user => {
            if(user){
                this.loadUserData(user);
            }else{
                this.redirectToLogin();
            }
        });
    }

    getUserData = () =>{
       return fetch('/api/user',{
            credentials: 'include'
        })
        .then(res => res.json())
    }

    loadUserData = user =>{
        this.props.dispatch(loadUser(user))
        this.setState({
            loading: false,
        });
    }

    signOut = () =>{
        fetch('/api/user/signout',{
            credentials: 'include'
        })
        .then(this.redirectToLogin);
    }

    redirectToLogin = () =>{
        this.setState({
            redirect: true,
        });
    }

    toggleShowClassDetail = index =>{
        this.setState({
            ShowClassDetail: !this.state.ShowClassDetail,
        });
        this.props.dispatch(setClassIndex(index || 0));
    }

    toggleShowAddClass = () =>{
        this.setState({
            ShowAddClass: !this.state.ShowAddClass,
        });
    }
    
    render(){
        let { classes } = this.props;
        classes = classes.map((Class,index) => {
            return <ClassItem item={Class} onClick={() => this.toggleShowClassDetail(index)} key={index}/>;
        });

        if(this.state.redirect){
            return <Redirect to="/" />;
        }
        if(this.state.loading){
            return <div>Loading</div>
        }
        
        return(
            <div>
                <div id="dashboard">
                    <Navbar toggle={this.toggleShowAddClass} signOut={this.signOut}/>
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