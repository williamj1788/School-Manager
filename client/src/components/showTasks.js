import React from 'react';

import { connect } from "react-redux";

import { TransitionGroup, CSSTransition } from 'react-transition-group';
 
import { removeTask } from '../action';

const mapStateToProps = state => {
    return { classes: state.classes, classIndex: state.classIndex };
};

function parseDateToTime(input) {
    var parts = input.split('-');
    return new Date(parts[0], parts[1]-1, parts[2]).getTime();
}

class ShowTasks extends React.Component{

    handleOnClick = id => {
        this.props.dispatch(removeTask(id));
    }
    
    render(){
        let tasks = this.props.classes[this.props.classIndex].tasks.slice().sort((a,b) => {
            let dateA = parseDateToTime(a.due);
            let dateB = parseDateToTime(b.due);
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
                                    key={task.id}
                                    timeout={300}    
                                    classNames="item">
                                    <div className="detail-item">
                                        <p className="item-name">{task.name}</p>
                                        <div className="flex">
                                            <p className="due">Due in {Math.round((parseDateToTime(task.due) - Date.now()) / (1000 * 60 * 60 * 24))} days</p>
                                            <button className="item-close" type="button" onClick={() => this.handleOnClick(task.id)}></button>
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