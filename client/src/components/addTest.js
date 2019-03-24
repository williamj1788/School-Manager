import React from 'react';

import { addTest } from '../action';

import { connect } from "react-redux";

class AddTest extends React.Component{
    handleOnSubmit = event => {
        event.preventDefault();
        let form = document.getElementById('addTask-form');
        let formData = new FormData(form);
        this.props.dispatch(addTest({name: 'New Test', due: '2019-03-13'}));
        console.log('form submitted');
        form.reset();
        this.props.show();
    }
    render(){
        return(
            <div id="addTask">
                <div id="addTask-header">
                    <span id="addTask-header-text">Add Test</span>
                </div>
                <div className="offset">
                    <form id="addTask-form" onSubmit={this.handleOnSubmit}>
                        <label htmlFor="taskName">
                        Name: <input type="text" name="taskName" placeholder="Enter Name" required/>
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
AddTest = connect()(AddTest);
export default AddTest;