import React from 'react';

import { addTask } from '../../../redux/action';

import { connect } from "react-redux";
import uuid from 'uuid';

const mapStateToProps = state => {
    return { classID: state.classID, isGuess: state.isGuess };
}; 

class AddTask extends React.Component{

    handleOnSubmit = event => {
        event.preventDefault();
        let form = document.getElementById('addTask-form');
        if(!this.props.isGuess){
            let formData = new FormData(form);
            fetch(`/api/class/task?id=${this.props.classID}`,{
                method: 'POST',
                credentials: 'include',
                body: formData,
            })
            .then(res => res.json())
            .then(res => this.props.dispatch(addTask(res)));;
            form.reset();
            this.props.show();
        }else{
            const name = document.querySelector('input[name = taskName]').value;
            const due = document.querySelector('input[name = dueDate]').value;
            this.props.dispatch(addTask({
                _id: uuid(),
                name,
                due,
            }))
            form.reset();
            this.props.show();
        }
    }
    
    render(){
        return(
            <div id="addTask">
                <div id="addTask-header">
                    <span id="addTask-header-text">Add Task</span>
                </div>
                <div className="offset">
                    <form id="addTask-form" onSubmit={this.handleOnSubmit} >
                        <label htmlFor="taskName">
                        Name: <input type="text" name="taskName" placeholder="Enter Name" autoComplete="off" required/>
                        </label>
                        <label htmlFor="dueDate">
                       Due Date: <input type="date" name="dueDate" placeholder ="Enter Due Date" required/>
                        </label>
                        <button id="submit-task" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
AddTask = connect(mapStateToProps)(AddTask);
export default AddTask;