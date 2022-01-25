import React, { useState } from 'react'
import { get, post } from "../utilities";


import './ProfessorButtons.css'

const ProfessorButtons = (props) => {

    const [email, setEmail] = useState('')

    const emailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = () => {
        if (props.addingStaff){
            post('/api/staff', {email: email, courseId: props.courseId})
        }
        else if(props.removingStaff){
            post('/api/deleteStaff', {email: email, courseId: props.courseId})
        }
        else if(props.addingStudent){
            post('/api/students', {email: email, courseId: props.courseId})
        }
        else if(props.removingStudent){
            post('/api/deleteStudents', {email: email, courseId: props.courseId})
        }
        setEmail('')
    }

    const enterSubmit = (event) => {
        if(event.key === 'Enter'){
            handleSubmit()
        }
    }

    return (
        <div>
            <h1 className='card-title'>{props.title}</h1>
            <div className="add-staff-card-container">
                <div className="add-staff-class-card">
                    <div className='input-column'>
                        <div>
                             Email: 
                            <input style={{height: '20px'}} value={email} onChange={emailChange} onKeyPress={enterSubmit}/>
                        </div>
                        <button onClick={handleSubmit} style={{width: '75px', alignSelf: 'center'}}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfessorButtons