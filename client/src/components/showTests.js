import React from 'react';

import { connect } from "react-redux";

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { removeTest } from '../action';

const mapStateToProps = state => {
    return {tests: state.tests };
}; 
function parseDateToTime(input) {
    var parts = input.split('-');
    return new Date(parts[0], parts[1]-1, parts[2]).getTime();
}
class ShowTests extends React.Component{
    
    handleOnClick = index => {
        this.props.dispatch(removeTest(index));
    }
    
    render(){
        let tests = this.props.tests;
        tests = this.props.tests.slice().sort((a,b) => {
            let dateA = parseDateToTime(a.due);
            let dateB = parseDateToTime(b.due);
            if(dateA > dateB){
                return 1
            }else if(dateA < dateB){
                return -1
            }else{
                return 0;
            }
        });
        tests = tests.map((test,index) => {
            return (
                <CSSTransition
                key={test.id}
                timeout={300}    
                classNames="item">
                <div className="detail-item">
                    <p className="item-name">{test.name}</p>
                    <div className="flex">
                        <p className="due">{Math.round((parseDateToTime(test.due) - Date.now()) / (1000 * 60 * 60 * 24))} days left</p>
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