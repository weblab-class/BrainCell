import React, { useState, useEffect } from 'react'
import { post } from '../utilities'
import GradingStudent from './GradingStudent.js'

import './ProfAssignmentsList.css'

const Assignment = (props) => {

    const [isGraded, setIsGraded] = useState(false)
    const[grading, setGrading] = useState(false)

    const [grades, setGrades] = useState(new Map())

    // for(let i = 0; i < props.students.length; i++){
    //     setGrades((prev) => ({...prev, props.students[i].name: ''}))
    // }

    useEffect(() => {
        const temp = new Map();
        for(let i = 0; i < props.students.length; i++){
            temp.set(props.students[i].userId, "");
        }
        setGrades(temp);
    }, [])

    const addGrade = ( {target} ) => {
        // console.log(target)
        const {name, value} = target
        setGrades(grades.set(name, value));
        // console.log(grades)
    }
    // console.log(grades)
    const changeGrading = () => {
        grading ? (
            setGrading(false)
        ) : (setGrading(true))
    }

    const handleSubmit = () => {
        let toPost = []
        grades.forEach((grade, userId, grades) => {
            toPost.push({userId, grade})
        })
        post('/api/grades', {grades: toPost, courseId: props.courseId, assignmentId: props.assignmentId})
        setIsGraded(true)
        setGrading(false)
        setGrades(new Map())
    }

    const deleteAssignment = () => {
        post('/api/deleteAssignment', {courseId: props.courseId, assignmentId: props.assignmentId})
    }

    return (
        <div>
            <li style={{display: 'flex', justifyContent: 'space-between'}}>{props.name} 
                <span>
                    {isGraded ? (
                        <span>GRADED</span>
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
                        <div className="grading-card">

                            {props.students.map((student) => {
                                return (
                                    // <GradingStudent id={student.name} name={student.name} addGrade={addGrade}/>
                                    <label>
                                        {student.name}:
                                        <input type='text' name={student.userId} value={grades.studentName} onChange={addGrade} />
                                    </label>
                                )
                            })}

                            <button onClick={handleSubmit} style={{height: '20px', alignSelf: 'end'}}>Submit</button>
                        </div>
                    </div>
                </div>
            ) : (null)}
        </div>
    )
}

export default Assignment