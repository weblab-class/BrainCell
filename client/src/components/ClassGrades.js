import React from 'react'


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
        </div>
    )
}

export default ClassGrades