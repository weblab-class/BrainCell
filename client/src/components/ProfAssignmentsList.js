import React from 'react'
import { post } from '../utilities'

const Assignment = (props) => {
    const deleteAssignment = () => {
        console.log(props.assignmentId)
        post('/api/deleteAssignment', {courseId: props.courseId, assignmentId: props.assignmentId})
    }
    return (
        <li style={{display: 'flex', justifyContent: 'space-between'}}>{props.name} <span>GRADED <button className='edit-assignments' onClick={deleteAssignment}>-</button></span></li>
    )
}

export default Assignment