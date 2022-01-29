import React from 'react'

const ClassSchedule = (props) => {
    return (
        <div style={{width: '20%'}}>
            <h1>
                Schedule
            </h1>
            <hr></hr>
            {props.schedule.map((item) => <li style={{display: 'flex', justifyContent: 'space-between'}}>{item.day} <span>{item.hours}</span></li>)}
        </div>
    )
}

export default ClassSchedule