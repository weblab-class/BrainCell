import React, { useState, useEffect} from 'react'
import { get, post } from "../utilities";

import './MakeJoinClass.css'

const MakeJoinClass = (props) => {
    const [makeClass, setMakeClass] = useState(false)
    const [joinClass, setJoinClass] = useState(false)
    const [courseNumber, setCourseNumber] = useState('')
    const [courseName, setCourseName] = useState('')
    const [classCode, setClassCode] = useState('')

    const createClass = () => {
        if (joinClass) {
            setJoinClass(false)
        }

        makeClass ? (
            setMakeClass(false)
        ) : (setMakeClass(true))
    }

    const addClass = () => {
        if (makeClass) {
            setMakeClass(false)
        }

        joinClass ? (
            setJoinClass(false)
        ) : (setJoinClass(true))
    }

    const courseNumberChange = (event) => {
        setCourseNumber(event.target.value)
    }

    const courseNameChange = (event) => {
        setCourseName(event.target.value)
    }

    const handleSubmitMakeClass = () => {
        post('/api/course', {courseNumber: courseNumber, courseName: courseName, user: props.userId}).then(() => {
            setCourseNumber('')
            setCourseName('')
        })
    }

    const classCodeChange = (event) => {
        setClassCode(event.target.value)
    }

    const handleSubmitJoinClass = () => {
        post('/api/courseCode', {courseCode: classCode})
        setClassCode('')
    }

    return (
        <div>
            <div className="button-container" style={{height: props.height}}>
                <button className="make-class" onClick={createClass} style={{fontSize: props.fontSize}}>
                    Make Class
                </button>
                <button className="join-class" onClick={addClass} style={{fontSize: props.fontSize}}>
                    Join Class
                </button>
            </div>
            {makeClass ? (
                <div className="make-join-class-card-container">
                    <div className="make-join-class-card">
                        <div>
                            Course Number: 
                            <input style={{height: '20px'}} value={courseNumber} onChange={courseNumberChange}/>
                        </div>
                        <div>
                            Course Name: 
                            <input style={{height: '20px'}} value={courseName} onChange={courseNameChange} />
                        </div>
                        <button onClick={handleSubmitMakeClass}>
                            Submit
                        </button>
                    </div>
                </div>
            ) : (null)}

            {joinClass ? (
                <div className="make-join-class-card-container">
                    <div className="make-join-class-card">
                        <div>
                            Class Code: 
                            <input style={{height: '20px'}} value={classCode} onChange={classCodeChange} />
                        </div>
                        <button onClick={handleSubmitJoinClass}>
                            Submit
                        </button>
                    </div>
                </div>
            ) : (null)}
        </div>
    )
}

export default MakeJoinClass