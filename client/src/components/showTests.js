import React from 'react';

import { connect } from "react-redux";

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { removeTest } from '../action';

const mapStateToProps = state => {
    return {tests: state.tests };
}; 

class ShowTests extends React.Component{
    
    handleOnClick = index => {
        this.props.dispatch(removeTest(index));
    }
    
    render(){
        let tests = this.props.tests;
        tests = tests.map((test,index) => {
            return (
                <CSSTransition
                key={test.id}
                timeout={300}    
                classNames="item">
                <div className="detail-item">
                    <p className="item-name">{test.name}</p>
                    <div className="flex">
                        <p className="due">{test.due} days left</p>
                        <button className="item-close" type="button" onClick={() => this.handleOnClick(index)}></button>
                    </div>
                </div>
                </CSSTransition>
            )
        });
        return(
            <div className="detail-container">
                <div className="offset">
                    <button className="add-button" onClick={this.props.show}>Add Tests</button>
                    <div className="detail">
                    <TransitionGroup>{tests}</TransitionGroup>
                    </div>
                </div>
            </div>
        )
    }
}
ShowTests = connect(mapStateToProps)(ShowTests);
export default ShowTests;