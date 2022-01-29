import React, { useState } from 'react'
import { post } from '../utilities'

import './AddAssignment.css'

const AddAssignment = (props) => {
    const [name, setName] = useState("")
    const [dueDay, setDueDay] = useState(1)
    const [dueMonth, setDueMonth] = useState(1)
    const [dueHour, setDueHour] = useState(1)
    const [dueMinute, setDueMinute] = useState(1)

    let days = []
    let months = []
    let hours = []
    let minutes = []
    for(let i = 1; i < 60; i++){
        if(i < 32){
            days.push(i)
        }
        if(i < 13){
            months.push(i)
        }
        if(i < 24){
            hours.push(i)
        }
        minutes.push(i)
    }
    
    const nameChange = (event) => {
        setName(event.target.value)
    }

    const dayChange = (event) => {
        setDueDay(event.target.value)
    }

    const monthChange = (event) => {
        setDueMonth(event.target.value)
    }

    const hourChange = (event) => {
        setDueHour(event.target.value)
    }

    const minuteChange = (event) => {
        setDueMinute(event.target.value)
    }

    const handleSubmit = () => {
        post('/api/assignment', {name: name, dueDate: new Date(2022, dueMonth-1, dueDay, dueHour, dueMinute), id: props.courseId})
        setName('')
        setDueDay(1)
        setDueMonth(1)
        setDueHour(1)
        setDueMinute(1)
    }

    return (
        <div>
            <h1 className='card-title'>Add Assignment</h1>
            <div className="card-container">
                <div className="cards">
                    <div className='input-column'>
                        Assignment Name: 
                        <input style={{height: '20px'}} value={name} onChange={nameChange}/>
                        <p>Due Date:</p>
                        Day:
                        <select onChange={dayChange}>
                            {days.map((day) => {
                                return (<option>{day}</option>)
                            })}
                        </select>

                        Month:
                        <select onChange={monthChange}>
                            {months.map((month) => {
                                return (<option>{month}</option>)
                            })}
                        </select>

                        Hour:
                        <select onChange={hourChange}>
                            {hours.map((hour) => {
                                return (<option>{hour}</option>)
                            })}
                        </select>

                        Minute:
                        <select onChange={minuteChange}>
                            {minutes.map((minute) => {
                                return (<option>{minute}</option>)
                            })}
                        </select>

                    </div>
                    <button onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddAssignment