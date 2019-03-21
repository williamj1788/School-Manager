import React from 'react';

import { connect } from "react-redux";

import { TransitionGroup, CSSTransition } from 'react-transition-group';
 
import { removeTask } from '../action';

const mapStateToProps = state => {
    return { tasks: state.tasks };
}; 

class ShowTasks extends React.Component{

    handleOnClick = index => {
        this.props.dispatch(removeTask(index));
    }
    
    render(){
        return(
            <div className="detail-container">
                <div className="offset">
                    <button className="add-button" onClick={this.props.show}>Add Task</button>
                    <div className="detail">
                        <TransitionGroup>
                        {this.props.tasks.map((task,index) => (
                                <CSSTransition
                                    key={task.id}
                                    timeout={300}    
                                    classNames="item">
                                    <div className="detail-item">
                                        <p className="item-name">{task.name}</p>
                                        <div className="flex">
                                            <p className="due">Due in {task.due} days</p>
                                            <button className="item-close" type="button" onClick={() => this.handleOnClick(index)}></button>
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