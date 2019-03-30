import React from 'react';
import '../../../styles/addClass.scss';

import PropTypes from 'prop-types';

import { addClass } from '../../../redux/action';
import { connect } from "react-redux";

export class AddClass extends React.Component{
    onSubmit = event =>{
        event.preventDefault();
        
        return this.postNewClass()
        .then(newClass => {this.props.dispatch(addClass(newClass))})
        .then(this.props.toggle);
    }

    postNewClass = () => {
        return fetch('/api/class', {
            method: 'POST',
            body: this.getFormData(),
            credentials: 'include',
        })
        .then(res => res.json())
    }

    getFormData = () => {
        const form = document.getElementById('add-class-form');
        return new FormData(form);
    }

    render(){
        return(
            <div className="add-class">
                <div className="add-class-container">
                    <div className="header">
                        <span className="header-text">Add Class</span>
                        <button className="close-button" type="button" onClick={this.props.toggle}></button>
                    </div>
                    <form onSubmit={this.onSubmit} id="add-class-form">
                        <div className="form-container">
                            <input className="field" type="text" name="classname" placeholder="Enter Class Name" required/>
                            <input className="field" style={{width: '100px'}} name="classcolor" type="color"  required/>
                            <button id="submit" type="submit" >Sumbit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
AddClass.propTypes = {
    toggle: PropTypes.func.isRequired,
}
export default connect()(AddClass);