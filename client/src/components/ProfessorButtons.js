import React, { useState } from 'react'

import './ProfessorButtons.css'

const ProfessorButtons = (props) => {

    const [email, setEmail] = useState('')

    const emailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = () => {
        setEmail('')
    }

    return (
        <div>
            <h1 className='card-title'>{props.title}</h1>
            <div className="add-staff-card-container">
                <div className="add-staff-class-card">
                    <div>
                        Email: 
                        <input style={{height: '20px'}} value={email} onChange={emailChange}/>
                    </div>
                    <button onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfessorButtons