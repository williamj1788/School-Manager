import React from 'react';

import '../styles/classDetail.scss';
// import { CSSTransition } from 'react-transition-group'
import { Transition, animated } from 'react-spring/renderprops';
import { easeSinInOut } from 'd3-ease';

import ClassContainer from './classContatiner';

import AddTask from './addTask';
import AddTest from './addTest';

class ClassDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showAddTask: false,
            showAddTest: false,
            IsAddTabOpen: false,
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
            showAddTest: false,
            IsAddTabOpen: !this.state.showAddTask,
        });
    }
    SetshowAddTest = () => {
        this.setState({
            showAddTest: !this.state.showAddTest,
            showAddTask: false,
            IsAddTabOpen: !this.state.showAddTest,
        });
    }
    render(){
        return(
            <div id="class-detail">
                <Transition
                native
                items={this.state.IsAddTabOpen} keys={3}
                from={{position: 'relative',transform: "scale(0)", right: '0px'}}
                enter={[{transform: "scale(1)"}]}
                leave={{transform: "scale(0)"}}
                update={show => show ? {right: '300%'}:{right: '0'}}
                config={{duration: 1100, easing: easeSinInOut}}
                >
                {show => (props => (
                    <animated.div style={props}>
                        <ClassContainer toggle={this.toggle} show={[this.SetshowAddTask,this.SetshowAddTest]}/>
                    </animated.div>
                ))}
                </Transition>
                <Transition
                native
                items={this.state.showAddTask}
                from={{opacity: 0}}
                enter={{opacity: 1}}
                leave={{opacity: 0}}
                config={(item,state) => {
                    if(state === 'leave'){
                        return {duration: 300};
                    }
                   return {duration: 1100, delay: 1100};
                }}
                >
                {show => show && (props => (
                    <animated.div style={props}>
                        <AddTask show={this.SetshowAddTask} />
                    </animated.div>
                ))}
                </Transition>
                <Transition
                native
                items={this.state.showAddTest}
                from={{opacity: 0}}
                enter={{opacity: 1}}
                leave={{opacity: 0}}
                config={(item,state) => {
                    if(state === 'leave'){
                        return {duration: 300};
                    }
                   return {duration: 1100, delay: 1100};
                }}
                >
                {show => show && (props => (
                    <animated.div style={props}>
                        <AddTest show={this.SetshowAddTask} />
                    </animated.div>
                ))}
                </Transition>
            </div>
        )
    }
}

export default ClassDetail;