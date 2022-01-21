import React, { useState } from 'react'
import { post } from '../utilities'

const GradingStudent = (props) => {
    const [grade, setGrade] = useState('')

    const gradeChange = (event) => {
        setGrade(event.target.value)
        props.addGrade(grade)
    }

    // props.addGrade(grade)

    // return (
    //     <li style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
    //         {props.name} <span>Grade: <input value={grade} onChange={gradeChange}/></span>
    //     </li>
    // )

    return (
        <label>
            {props.name}:
            <input type='text' name={props.name} value={grade} onChange={gradeChange} />
        </label>
    )
}

export default GradingStudent