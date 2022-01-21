import React, { useState } from 'react'
import ClassDetails from './ClassDetails.js'

import './Class.css'

const ClassStudent = (props) => {
    let style = [{backgroundColor: props.color}, {borderColor: props.color}]
    const [details, setDetails] = useState(false)

    const handleClick = () => {
        details ? (
            setDetails(false) 
        ) : (setDetails(true))
    }

    return (
        details ? (
            <div>
                <ClassDetails name={props.name} staff={props.staff} color={props.color} onClick={handleClick} schedule={props.schedule}/>
            </div> 
            ) : (
            <div className="class-container">
                <div className="upper-half" style={style[0]}>
                    <h1 className="class-name">
                        {props.name} <span style={{color: 'white'}} onClick={handleClick}>+</span>
                    </h1>
                </div>
                <div className="bottom-half" style={style[1]}>
                    {props.assignments.map((assignment) => {
                        return (
                            <div>
                                <p> <span className="head">Due: </span> {assignment.dueDate}: {assignment.name}</p>
                            </div>
                        )
                    })}
                    <p> <span className="head">Grade: </span> {props.grade}</p>
                </div>
            </div>
            )
    )
}

export default ClassStudent