import React from 'react';

import '../styles/classDetail.scss';
// import { CSSTransition } from 'react-transition-group'
import { Transition, animated } from 'react-spring/renderprops';

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
                <Transition
                native
                items={true}
                from={{transform: "scale(0)"}}
                enter={{transform: "scale(1)"}}
                leave={{transform: "scale(0)"}}
                config={{duration: 400}}
                >
                {show => show && (props => (
                    <animated.div style={props}>
                        <ClassContainer toggle={this.toggle} />
                    </animated.div>
                ))}
                </Transition>
                {this.state.showAddTask && <AddTask show={this.SetshowAddTask} />}
            </div>
        )
    }
}

export default ClassDetail;