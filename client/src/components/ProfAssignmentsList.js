import React, { useState } from 'react'
import { post } from '../utilities'
import GradingStudent from './GradingStudent.js'

import './ProfAssignmentsList.css'

const Assignment = (props) => {

    const [isGraded, setIsGraded] = useState(false)
    const[grading, setGrading] = useState(false)

    const [grades, setGrades] = useState([])

    const addGrade = (grade) => {
        setGrades((prev) => [...prev, grade])
    }

    const changeGrading = () => {
        grading ? (
            setGrading(false)
        ) : (setGrading(true))
    }

    const handleSubmit = () => {
        // setIsGraded(true)
        // setGrading(false)
        // setGrades()
        console.log(grades)
    }

    const deleteAssignment = () => {
        post('/api/deleteAssignment', {courseId: props.courseId, assignmentId: props.assignmentId})
    }

    return (
        <div>
            <li style={{display: 'flex', justifyContent: 'space-between'}}>{props.name} 
                <span>
                    {isGraded ? (
                        <p>GRADED</p>
                    ) : (
                        <button onClick={changeGrading}>GRADE</button>
                    )} 

                    <button className='edit-assignments' onClick={deleteAssignment}>-</button>
                </span>
            </li>
            {grading ? (
                <div>
                    <h1 className='card-title'>Grading {props.name}</h1>
                    <div className="grading-card-container">
                        <form className="grading-card" onSubmit={handleSubmit}>

                            {props.students.map((student) => {
                                return (
                                    <GradingStudent name={student.name} addGrade={addGrade}/>
                                    // <label>
                                    //     {student.name}:
                                    //     <input type='text' name={student.name} value={grades} onChange={addGrade} />
                                    // </label>
                                )
                            })}

                            <input type='submit' value='Submit' style={{height: '20px', alignSelf: 'end'}}/>
                        </form>
                    </div>
                </div>
            ) : (null)}
        </div>
    )
}

export default Assignment