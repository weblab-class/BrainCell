import React, { useState } from 'react'
import './EditSchedule.css'

import { get, post } from "../utilities";

const Schedule = (props) => {
    const [monHours, setMonHours] = useState('')
    const [tuesHours, setTuesHours] = useState('')
    const [wedHours, setWedHours] = useState('')
    const [thursHours, setThursHours] = useState('')
    const [friHours, setFriHours] = useState('')

    const changeMonHours = (event) => {
        setMonHours(event.target.value)
    }

    const changeTuesHours = (event) => {
        setTuesHours(event.target.value)
    }

    const changeWedHours = (event) => {
        setWedHours(event.target.value)
    }

    const changeThursHours = (event) => {
        setThursHours(event.target.value)
    }

    const changeFriHours = (event) => {
        setFriHours(event.target.value)
    }

    const handleSubmit = () => {

        let schedule = [
            {day: 'Monday', hours: monHours},
            {day: 'Tuesday', hours: tuesHours},
            {day: 'Wednesday', hours: wedHours},
            {day: 'Thursday', hours: thursHours},
            {day: 'Friday', hours: friHours}
        ]

        post('/api/schedule', {courseId: props.courseId, schedule: schedule})
        setMonHours('')
        setTuesHours('')
        setWedHours('')
        setThursHours('')
        setFriHours('')
    }

    return (
        <div>
            <h1 className='card-title'>{props.title}</h1>
            <div className="card-container">
                <div className="card">
                    <div>
                        Monday: 
                        <input style={{height: '20px'}} value={monHours} onChange={changeMonHours}/>
                        Tuesday:
                        <input style={{height: '20px'}} value={tuesHours} onChange={changeTuesHours}/>
                        Wednesday:
                        <input style={{height: '20px'}} value={wedHours} onChange={changeWedHours}/>
                        Thursday:
                        <input style={{height: '20px'}} value={thursHours} onChange={changeThursHours}/>
                        Friday:
                        <input style={{height: '20px'}} value={friHours} onChange={changeFriHours}/>
                    </div>
                    <button onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Schedule