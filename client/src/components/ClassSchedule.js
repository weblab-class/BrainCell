import React from 'react'

const ClassSchedule = (props) => {

    return (
        <div>
            <h1>
                Schedule
            </h1>
            <hr></hr>
            {props.schedule.map((item) => <li>{item.day} <span>{item.hours}</span></li>)}
        </div>
    )
}

export default ClassSchedule