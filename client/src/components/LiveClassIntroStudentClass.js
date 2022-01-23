import React, { useState } from 'react'
import { get } from '../utilities'

import './LiveClassIntroScreen.css'

const StudentClass = (props) => {
    const [session, setSession] = useState()

    const handleClick = () => {
        get('/api/sessions', {courseId: props.courseId}).then((session) => {
            setSessions(session)
        })
        console.log(session)
        props.studentMode()
        // props.setClassInSession(props.courseId)
    }

    return (
        <div className='class-circle-container'>
            <div className='class-circle' style={{backgroundColor: course.color}}>
                {course.courseNumber}: {course.name}
            </div>
            <button className='start-join-button' onClick={handleClick}>
                JOIN
            </button>
        </div>
    )
}

export default StudentClass