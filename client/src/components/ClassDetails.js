import React, { useEffect, useState } from 'react'
import ClassGrades from './ClassGrades.js'
import ClassStaff from './ClassStaff.js'
import ClassSchedule from './ClassSchedule.js'

import './Class.css'
import './ClassDetails.css'

import { get, post } from "../utilities";

const ClassDetails = (props) => {

    const [grades, setGrades] = useState([])

    useEffect(() => {
        // console.log(props.userId)
        // get('/api/allGrades', {courseId: props.courseId, userId: props.userId}).then((grade) => {
        //     setGrades((prev) => [...prev, grade])
        // })

        get('/api/allGrades', {courseId: props.courseId, userId: props.userId}).then((g) => {
            setGrades(g)
        })
    }, [grades])

    return (
        <div className='class-container'>
            {/* {console.log(grades)} */}
            <div className='upper-half' style={{backgroundColor: props.color}}>            
                <h1 className='class-name'>
                    {props.name} <span style={{color: 'white'}} onClick={props.onClick}>X</span>
                </h1>
            </div>
            <div className='bottom-half' style={{borderColor: props.color}}>
                <div className='body'>
                    <div style={{width: '16%'}}>
                        <ClassGrades assignments={props.assignments} grades={grades}/>
                    </div>
                    <div style={{width: '30%'}}>
                        <ClassStaff staff={props.staff}/>
                    </div> 
                </div>
                <div style={{display: 'flex', justifyContent: 'left'}}>
                    <ClassSchedule schedule={props.schedule} />
                </div>
            </div>
        </div>
    )
}

export default ClassDetails 