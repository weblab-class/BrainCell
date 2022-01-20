import React from 'react'
import ClassGrades from './ClassGrades.js'
import ClassStaff from './ClassStaff.js'
import ClassSchedule from './ClassSchedule.js'

import './Class.css'
import './ClassDetails.css'

const ClassDetails = (props) => {
    let grades = [
        {name: 'Pset1',
         grade: 95},
        {name: 'Pset2',
         grade: 70},
        {name: 'Exam1',
         grade: 69}
    ]

    // let staff = [
    //     {name: 'Prof. Guth',
    //      email: 'lguth@mit.edu'},
    //     {name: 'Brian Chen',
    //      email: 'bchen@mit.edu'},
    //     {name: 'Max 1',
    //      email: 'realm1@mit.edu'},
    // ]

    let schedule = [
        {day: 'Monday',
         hours: '9 am - 11 am'},
        {day: 'Tuesday',
         hours: '2 pm - 3 pm'},
        {day: 'Wednesday',
         hours: '9 am - 11 am'},
        {day: 'Thursday',
         hours: '2 pm - 3 pm'},
        {day: 'Friday',
         hours: 'None'},
    ]

    return (
        <div className='class-container'>
            <div className='upper-half' style={{backgroundColor: props.color}}>            
                <h1 className='class-name'>
                    {props.name} <span style={{color: 'white'}} onClick={props.onClick}>X</span>
                </h1>
            </div>
            <div className='bottom-half' style={{borderColor: props.color}}>
                <div className='body'>
                    <div style={{width: '16%'}}>
                        <ClassGrades grades={grades} />
                    </div>
                    <div style={{width: '30%'}}>
                        <ClassStaff staff={props.staff}/>
                    </div> 
                </div>
                <div style={{display: 'flex', justifyContent: 'left'}}>
                    <ClassSchedule schedule={schedule} />
                </div>
            </div>
        </div>
    )
}

export default ClassDetails 