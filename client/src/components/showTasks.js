import React from 'react';

import { connect } from "react-redux";

const mapStateToProps = state => {
    return { tasks: state.tasks };
}; 

class ShowTasks extends React.Component{

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
            <div className="detail-container">
                <div className="offset">
                    <button className="add-button">Add Task</button>
                    <div className="detail">
                        {tasks}
                    </div>
                </div>
            </div>
        )
    }
}

ShowTasks = connect(mapStateToProps)(ShowTasks);
export default ShowTasks;