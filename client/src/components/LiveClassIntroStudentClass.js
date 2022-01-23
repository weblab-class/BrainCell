import React, { useState } from 'react'
import { get } from '../utilities'

import './LiveClassIntroScreen.css'

const StudentClass = (props) => {

    const handleClick = () => {
        get('/api/sessions', {courseId: props.courseId}).then((session) => {
            console.log(session)
        })
  
        props.studentMode()
        // props.setClassInSession(props.courseId)
    }

    return (
        <div className='class-circle-container'>
            <div className='class-circle' style={{backgroundColor: props.color}}>
                {props.courseNumber}: {props.name}
            </div>
            <button className='start-join-button' onClick={handleClick}>
                JOIN
            </button>
        </div>
    )
}

export default StudentClass