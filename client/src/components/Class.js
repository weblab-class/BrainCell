import React from "react";

import './Class.css'

const Class = (props) => {
    let style = [{backgroundColor: props.color}, {borderBottomColor: props.color}]

    return (
        <div className="class-container">
            <div className="upper-half" style={style[0]}>
                <h1 className="class-name">{props.name}</h1>
            </div>
            <div className="bottom-half" style={style[1]}>
                <p>Due {props.assignment.dueDate.toString()}: {props.assignment.name}</p>
                <p>Grade: {props.grade}</p>
            </div>
        </div>
    )
}

export default Class