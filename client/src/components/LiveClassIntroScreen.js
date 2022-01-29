import React from 'react'
import ProfClass from './LiveClassIntroProfClass.js'
import StudentClass from './LiveClassIntroStudentClass.js'

import './LiveClassIntroScreen.css'

const IntroScreen = (props) => {
    if(props.studentClasses.length === 0 && props.professorClasses.length === 0){
        return (
            <div className='box-container'>
                <div className='no-classes-box'>
                    NO CLASSES
                </div>
        </div>
        )
    }
    return (
        <div className='box-container'>
            <div className='classes-box'>
                {props.professorClasses.map((course) => 
                    <ProfClass color={course.color} courseNumber={course.courseNumber} name={course.name}
                    courseId={course._id} professorMode={props.professorMode} setClassInSession={props.setClassInSession}/>
                )}
                {props.studentClasses.map((course) => 
                    <StudentClass color={course.color} courseNumber={course.courseNumber} name={course.name}
                    courseId={course._id} studentMode={props.studentMode} />
                )}
            </div>
        </div>
    )
}

export default IntroScreen