import React from 'react';

import { connect } from "react-redux";

const mapStateToProps = state => {
    return {tests: state.tests };
}; 

class ShowTests extends React.Component{

    render(){
        return(
            <div className="detail-container">
                <div className="offset">
                    <button className="add-button">Add Tests</button>
                    <div className="detail">
                        <h1>Hello Tests</h1>
                    </div>
                </div>
            </div>
        )
    }
}
ShowTests = connect(mapStateToProps)(ShowTests);
export default ShowTests;