import React from 'react';

import '../styles/classDetail.scss';

import ShowTasks from './showTasks';
import ShowTests from './showTests';

class ClassDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showTask: true,
            showTest: false,
        }
        this.SetShowtask = this.SetShowtask.bind(this);
        this.SetShowTest = this.SetShowTest.bind(this);
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


    render(){
        console.log(this.state.showTask);
        console.log(this.state.showTest);
        return(
            <div id="class-detail">
                <div id="class-container">
                    <div id="class-header">
                        <span id="class-header-text">Class Name</span>
                    </div>
                    <div id="tab-container">
                        <div className="tab" onMouseDown={this.SetShowtask} style={this.state.showTask ? {backgroundColor: '#06CAF2'} : null} >
                            <span className="centered" style={this.state.showTask ? {color: 'white'} : null}>Task</span>
                        </div>
                        <div className="tab" onMouseDown={this.SetShowTest} style={this.state.showTest ? {backgroundColor: '#06CAF2'} : null}>
                            <span className="centered" style={this.state.showTest ? {color: 'white'} : null}>Test</span>
                        </div>
                    </div>
                    {this.state.showTask && <ShowTasks />}
                    {this.state.showTest && <ShowTests />}
                </div>
            </div>
        )
    }
}

export default ClassDetail;