import React, { useState } from 'react'
import { post } from '../utilities'
import Assignment from './ProfAssignmentsList.js'

import './ProfessorAssignments.css'

const ProfessorAssignments = (props) => {

    const addAssignment = () => {
        post('/api/assignment', {name: 'Pset0', dueDate: new Date(2022, 2, 8), id: props.courseId})
    }

    return (
        <div>
            <h1 style={{display: 'flex', justifyContent: 'space-between'}}>
                Assignments
                <button className='edit-assignments' onClick={addAssignment}>+</button>
            </h1>
            <hr></hr>
            {props.assignments.map((assignment) => {
                return (
                    <Assignment name={assignment.name} assignmentId={assignment._id} courseId={props.courseId}/>
                )
       
            })}
        </div>
    )
}

export default ProfessorAssignments