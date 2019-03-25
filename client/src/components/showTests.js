import React from 'react';

import { connect } from "react-redux";

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { removeTest } from '../action';

import moment from 'moment';

const mapStateToProps = state => {
    return { classes: state.classes, classIndex: state.classIndex, classID: state.classID };
}; 
class ShowTests extends React.Component{
    
    handleOnClick = id => {
        fetch(`http://localhost:8080/api/class/test?classID=${this.props.classID}&testID=${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        this.props.dispatch(removeTest(id));
    }
    
    render(){
        let tests = this.props.classes[this.props.classIndex].Tests.slice().sort((a,b) => {
            let dateA = moment(a.due).unix();
            let dateB = moment(b.due).unix();
            if(dateA > dateB){
                return 1
            }else if(dateA < dateB){
                return -1
            }else{
                return 0;
            }
        });
        tests = tests.map(test => {
            return (
                <CSSTransition
                key={test._id}
                timeout={300}  
                classNames="item">
                <div className="detail-item">
                    <p className="item-name">{test.name}</p>
                    <div className="flex">
                        <p className="due">{Math.round((moment(test.due).unix() - moment().unix()) / (60 * 60 * 24)) + 1} days left</p>
                        <button className="item-close" type="button" onClick={() => this.handleOnClick(test._id)}></button>
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