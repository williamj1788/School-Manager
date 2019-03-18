import React from 'react';

import { connect } from "react-redux";

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
                <div key={index} className="detail-item">
                    <p className="item-name">{test.name}</p>
                    <div className="flex">
                        <p className="due">{test.due} days left</p>
                        <button className="item-close" type="button" onClick={() => this.handleOnClick(index)}></button>
                    </div>
                </div>
            )
        });
        return(
            <div className="detail-container">
                <div className="offset">
                    <button className="add-button">Add Tests</button>
                    <div className="detail">
                        {tests}
                    </div>
                </div>
            </div>
        )
    }
}
ShowTests = connect(mapStateToProps)(ShowTests);
export default ShowTests;