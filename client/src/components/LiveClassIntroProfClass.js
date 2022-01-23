import React from 'react'
import { post } from '../utilities'

import './LiveClassIntroScreen.css'

const ProfClass = (props) => {

    const handleClick = () => {
        post('/api/newSession', {courseId: props.courseId})
        props.professorMode()
        props.setClassInSession(props.courseId)
    }

    return (
        <div className='class-circle-container'>
            <div className='class-circle' style={{backgroundColor: props.color}}>
                {props.courseNumber}: {props.name}
            </div>
            <button className='start-join-button' onClick={handleClick}>
                START
            </button>
        </div>
    )
}

export default ProfClass