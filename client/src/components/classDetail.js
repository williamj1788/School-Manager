import React from 'react';

import '../styles/classDetail.scss';

class ClassDetail extends React.Component{

    render(){
        return(
            <div id="class-detail">
                <div id="class-container">
                    <div id="class-header">
                        <span id="class-header-text">Class Name</span>
                    </div>
                    <div id="tab-container">
                        <div className="tab">
                            <span className="centered">Task</span>
                        </div>
                        <div className="tab">
                            <span className="centered">Test</span>
                        </div>
                    </div>
                    <div className="detail-container">
                        <div className="offset"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClassDetail;