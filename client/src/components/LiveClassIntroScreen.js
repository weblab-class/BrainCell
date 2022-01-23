import React from 'react'

import './LiveClassIntroScreen.css'

const IntroScreen = (props) => {
    return (
        <div style={{height: '500px', display: 'flex', justifyContent: 'center', 
        alignItems: 'center'}}>
            <div className='classes-box'>
                {props.professorClasses.map((course) => {
                    return (
                        <div className='class-circle-container'>
                            <div className='class-circle' style={{backgroundColor: course.color}}>
                                {course.courseNumber}: {course.name}
                            </div>
                            <button className='start-join-button' onClick={props.professorMode}>
                                START
                            </button>
                        </div>
                    )
                })}
                {props.studentClasses.map((course) => {
                    return (
                        <div className='class-circle-container'>
                            <div className='class-circle' style={{backgroundColor: course.color}}>
                                {course.courseNumber}: {course.name}
                            </div>
                            <button className='start-join-button' onClick={props.studentMode}>
                                JOIN
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default IntroScreen