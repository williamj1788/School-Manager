import React from 'react';
import '../../styles/dashboard.scss';

import Navbar from './navbar';
import AddClass from './Add/addClass';
import ClassDetail from './classDetail';

import { connect } from "react-redux";

import { setUser, setClassIndex } from '../../redux/action';

const mapStateToProps = state => {
    return { classes: state.classes, username: state.username };
}; 

export class Dashboard extends React.Component{
    state = {
        ShowAddClass: false,
        ShowClassDetail: false,
        loading: true,
    }

    componentDidMount(){
        fetch('/api/user',{
            credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
            if(res.username){
                this.props.dispatch(setUser(res))
                this.setState({
                    loading: false,
                });
            }else{
                this.setState({
                    redirect: true,
                    loading: false,
                });
            }
        })
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
        let classes = this.props.classes;
        classes = classes.map((Class,index) => {
            return <div className="class" onClick={() => this.toggleShowClassDetail(index)} key={index}  style={{backgroundColor: Class.color}}><span className="class-name">{Class.name}</span></div>;
        });
        if(this.state.loading){
            return <div>Loading</div>
        }
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
export default connect(mapStateToProps)(Dashboard);