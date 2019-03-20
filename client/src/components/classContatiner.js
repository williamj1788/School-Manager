import React from 'react';

import ShowTasks from './showTasks';
import ShowTests from './showTests';

class ClassContainer extends React.Component{
    state = {
        showTask: true,
        showTest: false,
    }
    
    SetShowTest = () =>{
        this.setState({
            showTask: false,
            showTest: true,
        });
    }

    SetShowtask = () =>{
        this.setState({
            showTask: true,
            showTest: false,
        });
    }
    render(){
        return(
            <div id="class-container">
                <div id="class-header">
                    <span id="class-header-text">Class Name</span>
                    <button className="close-button" onClick={this.props.toggle} style={{width: '35px', height: '35px'}} type="button"></button>
                </div>
                <div id="tab-container">
                    <div className="tab" onMouseDown={this.SetShowtask} style={this.state.showTask ? {backgroundColor: '#06CAF2'} : null} >
                        <span className="centered" style={this.state.showTask ? {color: 'white'} : null}>Task</span>
                    </div>
                    <div className="tab" onMouseDown={this.SetShowTest} style={this.state.showTest ? {backgroundColor: '#06CAF2'} : null}>
                        <span className="centered" style={this.state.showTest ? {color: 'white'} : null}>Test</span>
                    </div>
                </div>
                {this.state.showTask && <ShowTasks show={this.SetshowAddTask} />}
                {this.state.showTest && <ShowTests />}
            </div>
        )
    }
}

export default ClassContainer;