import React from 'react';

import { addTest } from '../../../redux/action';

import { connect } from "react-redux";

const mapStateToProps = state => {
    return { classID: state.classID };
};

class AddTest extends React.Component{
    handleOnSubmit = event => {
        event.preventDefault();
        let form = document.getElementById('addTask-form');
        let formData = new FormData(form);
        fetch(`/api/class/test?id=${this.props.classID}`,{
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
        .then(res => res.json())
        .then(res => this.props.dispatch(addTest(res)));;
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
AddTest = connect(mapStateToProps)(AddTest);
export default AddTest;