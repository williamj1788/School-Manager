import React from 'react';
import '../styles/dashboard.scss';

import Navbar from './navbar';
import AddClass from './addClass';
import ClassDetail from './classDetail';

// import { Transition, animated } from 'react-spring/renderprops';

import { connect } from "react-redux";

import { setClass } from '../action';

const mapStateToProps = state => {
    return { classes: state.classes };
}; 

class Dashboard extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            ShowAddClass: false,
            ShowClassDetail: false,
            loading: true,
        }
        this.toggleShowAddClass = this.toggleShowAddClass.bind(this);
        this.toggleShowClassDetail = this.toggleShowClassDetail.bind(this);    
    }

    componentDidMount(){
        fetch('http://localhost:8080/api/user',{
            credentials: 'include'
        })
        .then(res => {
            if(res.status === 404){
                this.setState({
                    redirect: true,
                    loading: false,
                });
                return res;
            }else{
                return res.json();
            }
        })
        .then(res => {
            console.log(res);
            if(res.username){
                this.setState({
                    username: res.username,
                    loading: false,
                });
                this.props.dispatch(setClass(res.classes));
            }
        })
    }

    toggleShowClassDetail(){
        this.setState({
            ShowClassDetail: !this.state.ShowClassDetail,
        },() => console.log('clicked'));
    }

    toggleShowAddClass(){
        this.setState({
            ShowAddClass: !this.state.ShowAddClass,
        },() => console.log('clicked'));
    }
    
    render(){
        let classes = this.props.classes;
        classes = classes.map((Class,index) => {
            return <div className="class" onClick={this.toggleShowClassDetail} key={index} style={{backgroundColor: Class.color}}><span className="class-name">{Class.name}</span></div>;
        });
        return(
            <div>
                <div id="dashboard">
                    <Navbar username={this.state.username} loading={this.state.loading} toggle={this.toggleShowAddClass}/>
                    <div id="class-container">
                        {classes}
                    </div>
                </div>
                {this.state.ShowAddClass && <AddClass toggle={this.toggleShowAddClass}/>}
                {this.state.ShowClassDetail && <ClassDetail toggle={this.toggleShowClassDetail} />}
            </div>
        )
    }
}
Dashboard = connect(mapStateToProps)(Dashboard);
export default Dashboard;