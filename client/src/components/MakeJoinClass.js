import React, { useState } from 'react'
import { post } from "../utilities";

import './MakeJoinClass.css'

const MakeJoinClass = (props) => {
    const [makeClass, setMakeClass] = useState(false)
    const [joinClass, setJoinClass] = useState(false)
    const [courseNumber, setCourseNumber] = useState('')
    const [courseName, setCourseName] = useState('')
    const [classCode, setClassCode] = useState('')

    let color = ['red', 'blue', 'green', 'orange']
    let randColor = color[Math.floor(Math.random()*color.length)]

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
        post('/api/course', {courseNumber: courseNumber, courseName: courseName, user: props.userId, color: randColor}).then(() => {
            setCourseNumber('')
            setCourseName('')
        })
    }

    const enterSubmitMakeClass = (event) => {
        if (event.key === 'Enter'){
            handleSubmitMakeClass()
        }
    }

    const classCodeChange = (event) => {
        setClassCode(event.target.value)
    }

    const handleSubmitJoinClass = () => {
        post('/api/courseCode', {courseCode: classCode})
        setClassCode('')
    }

    const enterSubmitJoinClass = (event) => {
        if (event.key === 'Enter'){
            handleSubmitJoinClass()
        }
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
                        <div className='input-column'>
                            <div>
                                Course Number: 
                                <input style={{height: '20px'}} value={courseNumber} onChange={courseNumberChange} onKeyPress={enterSubmitMakeClass}/>
                            </div>
                            <div>
                                Course Name: 
                                <input style={{height: '20px'}} value={courseName} onChange={courseNameChange} onKeyPress={enterSubmitMakeClass}/>
                            </div>
                            <button onClick={handleSubmitMakeClass} className='submit-button'>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            ) : (null)}

            {joinClass ? (
                <div className="make-join-class-card-container">
                    <div className="make-join-class-card">
                        <div className='input-column'>
                            <div>
                                Class Code: 
                                <input style={{height: '20px'}} value={classCode} onChange={classCodeChange} onKeyPress={enterSubmitJoinClass}/>
                            </div>
                            <button onClick={handleSubmitJoinClass} className='submit-button'>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            ) : (null)}
        </div>
    )
}

export default MakeJoinClass