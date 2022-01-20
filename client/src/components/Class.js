import React, { useEffect, useState } from "react";
import ClassProfessor from './ClassProfessor.js'
import ClassStudent from './ClassStudent.js'

import './Class.css'

const Class = (props) => {
    const [professorMode, setProfessorMode] = useState(undefined)
    const [deleted, setDeleted] = useState(false)

    let profMode = false    
    for (let i = 0; i < props.staff.length; i++){
        if (props.staff[i] === props.userId){
            profMode = true
            break;
        }
    }

    useEffect(() => {
        setProfessorMode(profMode)
    }, [])

    const deleteClass = () => {
        delete('/api/course', {id: props.courseId})
        profMode = false
        setProfessorMode(false)
        setDeleted(true)
    }

    return (
        deleted ? (null) : (
            professorMode ? (
                <ClassProfessor name={props.name} color={props.color} numStudents='120'
                classCode={props.courseCode} staff={props.staff} numStudents={props.numStudents}
                deleteClass={deleteClass}/> 
            ) : (
                <ClassStudent name={props.name} assignments={props.assignments} grade={props.grade} color={props.color}
                staff={props.staff}/> 
            )
            )
    )
}

export default Class