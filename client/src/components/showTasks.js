import React from 'react';

import { connect } from "react-redux";

import { TransitionGroup, CSSTransition } from 'react-transition-group';
 
import { removeTask } from '../action';

import moment from 'moment';

const mapStateToProps = state => {
    return { classes: state.classes, classIndex: state.classIndex, classID: state.classID };
};

class ShowTasks extends React.Component{

    handleOnClick = id => {
        fetch(`/api/class/task?classID=${this.props.classID}&taskID=${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        this.props.dispatch(removeTask(id));
    }
    
    render(){
        let tasks = this.props.classes[this.props.classIndex].Tasks.slice().sort((a,b) => {
            let dateA = moment(a.due).unix();
            let dateB = moment(b.due).unix();
            if(dateA > dateB){
                return 1
            }else if(dateA < dateB){
                return -1
            }else{
                return 0;
            }
        });
        return(
            <div className="detail-container">
                <div className="offset">
                    <button className="add-button" onClick={this.props.show}>Add Task</button>
                    <div className="detail">
                        <TransitionGroup>
                        {tasks.map(task => (
                                <CSSTransition
                                    key={task._id}
                                    timeout={300}    
                                    classNames="item">
                                    <div className="detail-item">
                                        <p className="item-name">{task.name}</p>
                                        <div className="flex">
                                            <p className="due">Due in {Math.round((moment(task.due).unix() - moment().unix()) / (60 * 60 * 24)) + 1} days</p>
                                            <button className="item-close" type="button" onClick={() => this.handleOnClick(task._id)}></button>
                                        </div>
                                    </div>
                                </CSSTransition>
                            )
                        )}
                        </TransitionGroup >
                    </div>
                </div>
            </div>
        )
    }
}

ShowTasks = connect(mapStateToProps)(ShowTasks);
export default ShowTasks;