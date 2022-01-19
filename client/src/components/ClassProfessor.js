import React, { useState } from 'react'

import './ClassProfessor.css'
import NumStudents from './ClassProfessorNumStudents.js'
import ProfStaff from './ClassProfessorStaff.js'
import ClassCode from './ClassProfessorClassCode.js'
import ProfessorClassDetails from './ProfessorClassDetails.js'

const ClassProfessor = (props) => {
    let style = [{backgroundColor: props.color}, {borderColor: props.color}]
    let staff = [
        {name: 'Adam Hartz',
         email: 'ahartz@mit.edu'},
        {name: 'John Goodman',
         email: 'jgoodmann@mit.edu'}
    ]

    const [details, setDetails] = useState(false)

    const handleClick = () => {
        details ? (
            setDetails(false) 
        ) : (setDetails(true))
    }

    return (
        details ? (
            <div>
                <ProfessorClassDetails onClick={handleClick} name={props.name} color={props.color}
                assignments={[{name: 'Pset0', graded: true}, {name: 'Lab1', graded: false}]}/>
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
                            <NumStudents />
                        </div>
                        <div style={{width: '30%'}}>
                            <ProfStaff staff={staff}/>
                        </div> 
                    </div>
                    <div className='body'>
                        <div style={{display: 'flex', justifyContent: 'left'}}>
                            <ClassCode classCode={'9at8gb'} />
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