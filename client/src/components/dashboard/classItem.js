import React from 'react';

const ClassItem = (props) => {
    const { onClick, item} = props;
    return(
        <div className="class" onClick={onClick} style={{backgroundColor: item.color}}><span className="class-name">{item.name}</span></div>
    )
}

export default ClassItem;