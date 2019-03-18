import React from 'react';

import '../styles/classDetail.scss';

import ShowTasks from './showTasks';
import ShowTests from './showTests';

import AddTask from './addTask';

class ClassDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showTask: true,
            showTest: false,
            showAddTask: true,
        }
        this.SetShowtask = this.SetShowtask.bind(this);
        this.SetShowTest = this.SetShowTest.bind(this);
        this.SetshowAddTask = this.SetshowAddTask.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.props.toggle();
    }
    
    SetShowTest(){
        this.setState({
            showTask: false,
            showTest: true,
        });
    }

    SetShowtask(){
        this.setState({
            showTask: true,
            showTest: false,
        });
    }

    SetshowAddTask(){
        this.setState({
            showAddTask: !this.state.showAddTask,
        });
    }


    render(){
        return(
            <div id="class-detail">
                <div id="class-container">
                    <div id="class-header">
                        <span id="class-header-text">Class Name</span>
                        <button className="close-button" onClick={this.toggle} style={{width: '35px', height: '35px'}} type="button"></button>
                    </div>
                    <div id="tab-container">
                        <div className="tab" onMouseDown={this.SetShowtask} style={this.state.showTask ? {backgroundColor: '#06CAF2'} : null} >
                            <span className="centered" style={this.state.showTask ? {color: 'white'} : null}>Task</span>
                        </div>
                        <div className="tab" onMouseDown={this.SetShowTest} style={this.state.showTest ? {backgroundColor: '#06CAF2'} : null}>
                            <span className="centered" style={this.state.showTest ? {color: 'white'} : null}>Test</span>
                        </div>
                    </div>
                    {this.state.showTask && <ShowTasks show={this.SetshowAddTask} />}
                    {this.state.showTest && <ShowTests />}
                </div>
                {this.state.showAddTask && <AddTask />}
            </div>
        )
    }
}

export default ClassDetail;