import React from 'react';

import { connect } from "react-redux";
import PropTypes from 'prop-types';
const mapStateToProps = state => {
    return { username: state.username };
};

export class Navbar extends React.Component{
    
    render(){
        return(
            <nav>
                <div id="nav-container">
                    <span id="nav-logo">School Manager</span>
                    <div id="links">
                        <p className="nav-link" onClick={this.props.toggle}>Add Class</p>
                        <p className="nav-link" onClick={this.props.signOut}>Sign Out</p>
                        <p className="nav-user">{this.props.username}</p>
                    </div>
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    toggle: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
}
export default connect(mapStateToProps)(Navbar);