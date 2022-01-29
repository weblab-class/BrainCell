import React, { useState } from 'react'
import Assignment from './ProfAssignmentsList.js'
import AddAssignment from './AddAssignment.js'

import './ProfessorAssignments.css'

const ProfessorAssignments = (props) => {

    const [addingAssignment, setAddingAssignment] = useState(false)

    const addAssignment = () => {
        addingAssignment ? (
            setAddingAssignment(false)
        ) : (setAddingAssignment(true))
    }

    return (
        <div>
            <h1 style={{display: 'flex', justifyContent: 'space-between'}}>
                Assignments
                <button className='edit-assignments' onClick={addAssignment}>+</button>
            </h1>
            <hr></hr>

            {addingAssignment ? (
                <AddAssignment courseId={props.courseId}/>
            ) : (null)}

            {props.assignments.map((assignment) => {
                return (
                    <Assignment name={assignment.name} students={props.students} assignmentId={assignment._id} courseId={props.courseId}/>
                )
       
            })}
        </div>
    )
}

export default ProfessorAssignments