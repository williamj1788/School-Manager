import React from 'react';
import '../styles/dashboard.scss';

import Navbar from '../components/navbar';
import AddClass from './addClass';
import ClassDetail from './classDetail';

// import { Transition, animated } from 'react-spring/renderprops';

import { connect } from "react-redux";

import { setUser, setClassIndex } from '../action';

const mapStateToProps = state => {
    return { classes: state.classes,username: state.username };
}; 

class Dashboard extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
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
            if(res.username){
                this.props.dispatch(setUser(res))
                this.setState({
                    loading: false,
                });
            }
        })
    }

    toggleShowClassDetail(index){
        this.setState({
            ShowClassDetail: !this.state.ShowClassDetail,
        });
        this.props.dispatch(setClassIndex(index || 0));
    }

    toggleShowAddClass(){
        this.setState({
            ShowAddClass: !this.state.ShowAddClass,
        });
    }
    
    render(){
        let classes = this.props.classes;
        classes = classes.map((Class,index) => {
            return <div className="class" onClick={() => this.toggleShowClassDetail(index)} key={index}  style={{backgroundColor: Class.color}}><span className="class-name">{Class.name}</span></div>;
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
                {this.state.ShowClassDetail && <ClassDetail toggle={this.toggleShowClassDetail} index={this.state.classIndex}/>}
            </div>
        )
    }
}
Dashboard = connect(mapStateToProps)(Dashboard);
export default Dashboard;