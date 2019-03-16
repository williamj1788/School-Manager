import React from 'react';

import '../styles/addClass.scss';

class AddClass extends React.Component{
    render(){
        return(
            <div className="add-class">
                <div className="add-class-container">
                    <div className="header">
                        <span className="header-text">Add Class</span>
                        <button id="close-button" type="button"></button>
                    </div>
                    <form>
                        <div className="form-container">
                            <input className="field" type="text" name="classname" placeholder="Enter Class Name"/>
                            <input className="field" style={{width: '100px'}} name="classcolor" type="color" />
                            <button id="submit" type="submit" >Sumbit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddClass;