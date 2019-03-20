import React from 'react';

import '../styles/classDetail.scss';
// import { CSSTransition } from 'react-transition-group'
import { transition, Transition } from 'react-spring/renderprops';

import ClassContainer from './classContatiner';

import AddTask from './addTask';

class ClassDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showAddTask: false,
        }
        this.SetshowAddTask = this.SetshowAddTask.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.props.toggle();
    }

    SetshowAddTask(){
        this.setState({
            showAddTask: !this.state.showAddTask,
        });

    }
    render(){
        return(
            <div id="class-detail">
                {/* <Transition
                items={this.state.showAddTask}
                from={}
                > */}
                <ClassContainer toggle={this.toggle} />
                {this.state.showAddTask && <AddTask show={this.SetshowAddTask} />}
                {/* </Transition> */}
            </div>
        )
    }
}

export default ClassDetail;