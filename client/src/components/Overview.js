import React, { useState, useEffect } from "react";

import Class from './Class.js'

import { get, post } from "../utilities";
import MakeJoinClass from "./MakeJoinClass.js";

// assignment = {name: String, instructions: String, dueDate: Date}
// Date --> year, month, day, hour, mingute, second, millisecond

const Overview = (props) => {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        get('/api/course', {id: props.userId}).then((courses) => {
            setClasses(courses.map((course) => 
            <Class 
            name={`${course.courseNumber}: ${course.name}`} assignments={course.assignments} 
            color={course.color} staff={course.staff} grade='A' userId={props.userId} courseCode={course.courseCode}
            numStudents={course.students.length} courseId={course._id} students={course.students} schedule={course.schedule}/>
            ))
        })
    }, [classes])


    if (classes.length === 0){
        return (
            <MakeJoinClass height='300px' fontSize='50px' userId={props.userId}/>
        )
    }
    else {
        return (
            <div>
                <MakeJoinClass height='100px' fontSize='25px' userId={props.userId}/>
                {classes}
            </div>
        )
    }
}

export default Overview