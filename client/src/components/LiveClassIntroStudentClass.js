import React from 'react'

import './LiveClassIntroScreen.css'

const StudentClass = (props) => {

    const handleClick = () => {  
        props.studentMode()
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