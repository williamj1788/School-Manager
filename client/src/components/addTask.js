import React from 'react';

class AddTask extends React.Component{

    
    render(){
        return(
            <div id="addTask">
                <div id="addTask-header">
                    <span id="addTask-header-text">Add Task</span>
                </div>
                <div className="offset">
                    <form id="addTask-form">
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

export default AddTask;