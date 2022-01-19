import React, { useState, useEffect } from "react";

import Class from './Class.js'
import ClassProfessor from './ClassProfessor.js'

import { get, post } from "../utilities";
import MakeJoinClass from "./MakeJoinClass.js";

// assignment = {name: String, instructions: String, dueDate: Date}
// Date --> year, month, day, hour, mingute, second, millisecond

const Overview = (props) => {
    const [studentClasses, setStudentClasses] = useState([])
    // const [makeClass, setMakeClass] = useState(false)
    // const [joinClass, setJoinClass] = useState(false)
    // const [courseNumber, setCourseNumber] = useState('')
    // const [courseName, setCourseName] = useState('')
    // const [classCode, setClassCode] = useState('')

    useEffect(() => {
        get('/api/course', {id: props.userId}).then((courses) => {
            setStudentClasses(courses.map((course) => 
            <Class 
            name={`${course.courseNumber}: ${course.name}`} assignments={course.assignments} 
            color={course.color} grade='A'>
            </Class>))
        })
    }, [])

    // const createClass = () => {
    //     if (joinClass) {
    //         setJoinClass(false)
    //     }
    //     setMakeClass(true)
    // }

    // const addClass = () => {
    //     if (makeClass) {
    //         setMakeClass(false)
    //     }
    //     setJoinClass(true)
    // }

    // const courseNumberChange = (event) => {
    //     setCourseNumber(event.target.value)
    // }

    // const courseNameChange = (event) => {
    //     setCourseName(event.target.value)
    // }

    // const handleSubmitMakeClass = () => {
    //     post('/api/course', {courseNumber: courseNumber, name: courseName, professor: 'Test'})
    //     setCourseNumber('')
    //     setCourseName('')
    // }

    // const classCodeChange = (event) => {
    //     setClassCode(event.target.value)
    // }

    // const handleSubmitJoinClass = () => {
    //     post('/api/')
    //     setClassCode('')
    // }

    if (studentClasses.length === 0){
        return (
            <MakeJoinClass height='300px' fontSize='50px' userId={props.userId}/>
        )
    }
    else {
        return (
            <div>
                <MakeJoinClass height='100px' fontSize='25px' userId={props.userId}/>
                {/* {studentClasses} */}
                <ClassProfessor name='6.009 Fundamentals of Programming' color='blue' numStudents='120'
                classCode='9a6t8b'/>
            </div>

            // <div>
            //     <div className="button-container">
            //         <button className="make-class" onClick={createClass}>
            //             Make Class
            //         </button>
            //         <button className="join-class" onClick={addClass}>
            //             Join Class
            //         </button>
            //     </div>
            //     {makeClass ? (
            //         <div className="make-join-class-card-container">
            //             <div className="make-join-class-card">
            //                 <div>
            //                     Course Number: 
            //                     <input style={{height: '20px'}} value={courseNumber} onChange={courseNumberChange}/>
            //                 </div>
            //                 <div>
            //                     Course Name: 
            //                     <input style={{height: '20px'}} value={courseName} onChange={courseNameChange} />
            //                 </div>
            //                 <button onClick={handleSubmitMakeClass}>
            //                     Submit
            //                 </button>
            //             </div>
            //         </div>
            //     ) : (null)}

            //     {joinClass ? (
            //         <div className="make-join-class-card-container">
            //             <div className="make-join-class-card">
            //                 <div>
            //                     Class Code: 
            //                     <input style={{height: '20px'}} value={classCode} onChange={classCodeChange} />
            //                 </div>
            //                 <button onClick={handleSubmitJoinClass}>
            //                     Submit
            //                 </button>
            //             </div>
            //         </div>
            //     ) : (null)}
            // </div>
        )
    }
}

export default Overview