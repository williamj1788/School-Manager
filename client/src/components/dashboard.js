import React from 'react';

import '../styles/dashboard.scss';

class Dashboard extends React.Component{
    render(){
        return(
            <div id="dashboard">
                <nav>
                    <div id="nav-container">
                        <span id="nav-logo">School Handle</span>
                        <div id="links">
                            <p className="nav-link">Add Class</p>
                            <p className="nav-link">Sign Out</p>
                            <p className="nav-user">Username</p>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Dashboard;