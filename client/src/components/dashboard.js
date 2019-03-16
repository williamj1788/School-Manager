import React from 'react';
import '../styles/dashboard.scss';

import Navbar from './navbar';
import AddClass from './addClass';

import { connect } from "react-redux";

const mapStateToProps = state => {
    return { classes: state.classes };
}; 

class Dashboard extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            ShowAddClass: false,
            loading: true,
        }
        this.toggleShowAddClass = this.toggleShowAddClass.bind(this);   
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
                this.setState({
                    username: res.username,
                    loading: false,
                });
            }
        })
    }

    toggleShowAddClass(){
        this.setState({
            ShowAddClass: !this.state.ShowAddClass,
        });
    }
    
    render(){
        let classes = this.props.classes;
        classes = classes.map((Class,index) => {
            return <div className="class" key={index}><span className="class-name">{Class}</span></div>;
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
            </div>
        )
    }
}
Dashboard = connect(mapStateToProps)(Dashboard);
export default Dashboard;