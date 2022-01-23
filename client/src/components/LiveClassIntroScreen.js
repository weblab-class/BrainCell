import React from 'react'
import ProfClass from './LiveClassIntroProfClass.js'
import StudentClass from './LiveClassIntroStudentClass.js'

import './LiveClassIntroScreen.css'

const IntroScreen = (props) => {
    return (
        <div style={{height: '500px', display: 'flex', justifyContent: 'center', 
        alignItems: 'center'}}>
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