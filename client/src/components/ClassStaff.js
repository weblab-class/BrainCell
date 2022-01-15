import React from 'react'

const ClassStaff = (props) => {
    return (
        <div>
            <h1>
                Staff
            </h1>
            <hr></hr>
            {props.staff.map((person) => <li>{person.name} <span>{person.email}</span></li>)}
        </div>
    )
}

export default ClassStaff