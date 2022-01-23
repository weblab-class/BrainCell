import React, { useEffect, useState } from "react";
import ClassProfessor from './ClassProfessor.js'
import ClassStudent from './ClassStudent.js'
import { post } from '../utilities'

import './Class.css'

const Class = (props) => {
    const [professorMode, setProfessorMode] = useState(undefined)

    let profMode = false    
    for (let i = 0; i < props.staff.length; i++){
        if (props.staff[i].userId === props.userId){
            profMode = true
            break;
        }
    }

    useEffect(() => {
        setProfessorMode(profMode)
    }, [props.staff])

    const deleteClass = () => {
        post('/api/deleteCourse', {courseId: props.courseId})
    }

    if(professorMode){
        return (
            <ClassProfessor name={props.name} assignments={props.assignments} color={props.color}
            classCode={props.courseCode} staff={props.staff} numStudents={props.numStudents} students={props.students}
            deleteClass={deleteClass} courseId={props.courseId} /> 
        )
    }

    else{
        return (
            <ClassStudent name={props.name} assignments={props.assignments} grade={props.grade} color={props.color}
            staff={props.staff} schedule={props.schedule} courseId={props.courseId} userId={props.userId}/> 
        )
    }
}

export default Class