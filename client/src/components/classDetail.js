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
                        <div className="offset">
                            <button className="add-button">Add Task</button>
                            <div className="detail">
                                <div className="detail-item">
                                    <p className="item-name">Finish Homework</p>
                                    <div className="flex">
                                        <p className="due">Due in 7 days</p>
                                        <button className="item-close" type="button"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClassDetail;