import React from 'react';

import '../styles/addClass.scss';

import {addClass} from '../action';

import { connect } from "react-redux";

class AddClass extends React.Component{
    
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(event){
        event.preventDefault();
        
        let form = document.getElementById('add-class-form');
        let formData = new FormData(form);
        fetch('http://localhost:8080/api/customer', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        })
        .then(res => {return res.json()})
        .then(res => {this.props.dispatch(addClass(res))})
        .then(this.toggle);
    }
    
    toggle(){
        this.props.toggle();
    }
    render(){
        return(
            <div className="add-class">
                <div className="add-class-container">
                    <div className="header">
                        <span className="header-text">Add Class</span>
                        <button id="close-button" type="button" onClick={this.toggle}></button>
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
AddClass = connect()(AddClass);
export default AddClass;