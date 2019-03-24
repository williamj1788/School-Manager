import React from 'react';

import { addTask } from '../action';

import { connect } from "react-redux";

class AddTask extends React.Component{

    handleOnSubmit = event => {
        event.preventDefault();
        let form = document.getElementById('addTask-form');
        let formData = new FormData(form);
        for(let par of formData){
            console.log(`${par[0]} is ${par[1]}`);
        }
        this.props.dispatch(addTask({name: 'New Task', due: '2019-03-13'}));
        console.log('form submitted');
        form.reset();
        this.props.show();
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
                        Name: <input type="text" name="taskName" placeholder="Enter Name"/>
                        </label>
                        <label htmlFor="dueDate">
                       Due Date: <input type="date" name="dueDate" placeholder ="Enter Due Date"/>
                        </label>
                        <button id="submit-task" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
AddTask = connect()(AddTask);
export default AddTask;