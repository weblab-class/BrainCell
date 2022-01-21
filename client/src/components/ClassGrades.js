import React from 'react'

import './ClassGrades.css'


const ClassGrades = (props) => {

    console.log(props.grades)
    return (
        <div>
            <h1>
                Grades
            </h1>
            <hr></hr>
            {props.assignments.map((assignment) => <li style={{display: 'flex', justifyContent: 'space-between'}}>{assignment.name} <span>{assignment.grade}</span></li>)}
        </div>
    )
}

export default ClassGrades