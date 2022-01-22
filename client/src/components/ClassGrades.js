import React from 'react'
import { listen } from 'socket.io'

import './ClassGrades.css'


const ClassGrades = (props) => {
    let items = []
    for(let i = 0; i < props.assignments.length; i++){
        items.push(<li style={{display: 'flex', justifyContent: 'space-between'}}>{props.assignments[i].name} <span>{props.grades[i]}</span></li>)
    }
    return (
        <div>
            <h1>
                Grades
            </h1>
            <hr></hr>
            {items}
            {/* {props.assignments.map((assignment) => <li style={{display: 'flex', justifyContent: 'space-between'}}>{assignment.name} <span></span></li>)}
            {props.grades.map((grade) => <span>{grade}</span>)} */}
        </div>
    )
}

export default ClassGrades