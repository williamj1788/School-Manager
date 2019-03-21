import React from 'react';

import '../styles/classDetail.scss';
// import { CSSTransition } from 'react-transition-group'
import { Transition, animated } from 'react-spring/renderprops';
import { easeSinInOut } from 'd3-ease';

import ClassContainer from './classContatiner';

import AddTask from './addTask';

class ClassDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showAddTask: 1,
        }
        this.SetshowAddTask = this.SetshowAddTask.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.props.toggle();
    }

    SetshowAddTask(){
        this.setState({
            showAddTask: this.state.showAddTask === 1 ? 2 : 1,
        });

    }
    componentWillUnmount(){
        console.log('component unmouting');
    }
    render(){
        // console.log(this.state.showAddTask)
        return(
            <div id="class-detail">
                <Transition
                native
                items={this.state.showAddTask} keys={3}
                from={{position: 'relative',transform: "scale(0)", right: '0px'}}
                enter={[{transform: "scale(1)"}]}
                leave={{transform: "scale(0)"}}
                update={{ right: '200px'}}
                config={{duration: 1100, easing: easeSinInOut}}
                >
                {show => (props => (
                    <animated.div style={props}>
                        <ClassContainer toggle={this.toggle} show={this.SetshowAddTask}/>
                    </animated.div>
                ))}
                </Transition>
                {/* {this.state.showAddTask && <AddTask />} */}
            </div>
        )
    }
}

export default ClassDetail;