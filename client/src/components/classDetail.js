import React from 'react';

import '../styles/classDetail.scss';

import { connect } from "react-redux";

const mapStateToProps = state => {
    return { tasks: state.tasks, tests: state.tests };
}; 
class ClassDetail extends React.Component{

    render(){
        let tasks = this.props.tasks;
        tasks = tasks.map((task,index) => {
            return (
                <div key={index} className="detail-item">
                    <p className="item-name">{task.name}</p>
                    <div className="flex">
                        <p className="due">Due in {task.due} days</p>
                        <button className="item-close" type="button"></button>
                    </div>
                </div>
            )
        });
        return(
            <div id="class-detail">
                <div id="class-container">
                    <div id="class-header">
                        <span id="class-header-text">Class Name</span>
                    </div>
                    <div id="tab-container">
                        <div className="tab">
                            <span className="centered">Task</span>
                        </div>
                        <div className="tab">
                            <span className="centered">Test</span>
                        </div>
                    </div>
                    <div className="detail-container">
                        <div className="offset">
                            <button className="add-button">Add Task</button>
                            <div className="detail">
                                {tasks}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ClassDetail = connect(mapStateToProps)(ClassDetail);
export default ClassDetail;