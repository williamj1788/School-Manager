import React from 'react';

import '../../styles/classDetail.scss';
import { Transition, animated } from 'react-spring/renderprops';
import { easeSinInOut } from 'd3-ease';

import ClassContainer from './Classes/classContatiner';

import AddTask from './Add/addTask';
import AddTest from './Add/addTest';

class ClassDetail extends React.Component{
    state = {
        showAddTask: false,
        showAddTest: false,
        IsAnAddModalOpen: false,
    }

    SetshowAddTask = () => {
        this.setState({
            showAddTask: !this.state.showAddTask,
            showAddTest: false,
            IsAnAddModalOpen: !this.state.showAddTask,
        });
    }

    SetshowAddTest = () => {
        this.setState({
            showAddTest: !this.state.showAddTest,
            showAddTask: false,
            IsAnAddModalOpen: !this.state.showAddTest,
        });
    }
    
    render(){
        return(
            <div id="class-detail">
                <div className={`flexbox ${this.state.IsAnAddModalOpen && "expand"}`}>
                    <Transition
                    native
                    items={this.state.IsAnAddModalOpen} keys={3}
                    from={{position: 'relative', transform: "scale(0)", right: '0px'}}
                    enter={[{transform: "scale(1)"}]}
                    leave={{transform: "scale(0)"}}
                    config={{duration: 1100, easing: easeSinInOut}}
                    >
                    {show => (props => (
                        <animated.div style={{...props, width: '100%'}}>
                            <ClassContainer toggle={this.props.toggle} show={[this.SetshowAddTask,this.SetshowAddTest]}/>
                        </animated.div>
                    ))}
                    </Transition>
                    <Transition
                    native
                    items={this.state.showAddTask}
                    from={{opacity: 0}}
                    enter={{opacity: 1}}
                    leave={{opacity: 0}}
                    config={(item, state) => {
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
                    config={(item, state) => {
                        if(state === 'leave'){
                            return {duration: 300};
                        }
                    return {duration: 1100, delay: 1100};
                    }}
                    >
                    {show => show && (props => (
                        <animated.div style={props}>
                            <AddTest show={this.SetshowAddTest} />
                        </animated.div>
                    ))}
                    </Transition>
                </div>
            </div>
        )
    }
}

export default ClassDetail;