import React from "react";
import ClassProfessor from './ClassProfessor.js'
import ClassStudent from './ClassStudent.js'

import './Class.css'

const Class = (props) => {

    let profMode = false    
    for (let i = 0; i < props.staff.length; i++){
        if (props.staff[i] === props.userId){
            profMode = true
            break;
        }
    }

    return (
        profMode ? (
            <ClassProfessor name={props.name} color={props.color} numStudents='120'
            classCode={props.courseCode}/> 
        ) : (
            <ClassStudent name={props.name} assignments={props.assignments} grade={props.grade} color={props.color}/> 
        )
        )
}

export default Class