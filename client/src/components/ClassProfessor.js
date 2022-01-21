import React, { useState } from 'react'

import './ClassProfessor.css'
import NumStudents from './ClassProfessorNumStudents.js'
import ProfStaff from './ClassProfessorStaff.js'
import ClassCode from './ClassProfessorClassCode.js'
import ProfessorClassDetails from './ProfessorClassDetails.js'

const ClassProfessor = (props) => {
    let style = [{backgroundColor: props.color}, {borderColor: props.color}]
    // let staff = [
    //     {name: 'Adam Hartz',
    //      email: 'ahartz@mit.edu'},
    //     {name: 'John Goodman',
    //      email: 'jgoodmann@mit.edu'}
    // ]

    const [details, setDetails] = useState(false)

    const handleClick = () => {
        details ? (
            setDetails(false) 
        ) : (setDetails(true))
    }

    return (
        details ? (
            <div>
                <ProfessorClassDetails onClick={handleClick} name={props.name} courseId={props.courseId} color={props.color}
                assignments={props.assignments} students={props.students} />
            </div>
        ) : (
            <div className='class-container'>
                <div className='upper-half' style={{backgroundColor: props.color}}>            
                    <h1 className='class-name'>
                        {props.name} <span style={{color: 'white'}} onClick={handleClick}>+</span>
                    </h1>
                </div>
                <div className='bottom-half' style={{borderColor: props.color}}>
                    <div className='body'>
                        <div style={{width: '16%'}}>
                            <NumStudents numStudents={props.numStudents}/>
                        </div>
                        <div style={{width: '30%'}}>
                            <ProfStaff staff={props.staff}/>
                        </div> 
                    </div>
                    <div className='body'>
                        <div style={{display: 'flex', justifyContent: 'left'}}>
                            <ClassCode classCode={props.classCode} />
                        </div>
                        <div className='deleteButton' onClick={props.deleteClass}>
                            DELETE CLASS
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default ClassProfessor