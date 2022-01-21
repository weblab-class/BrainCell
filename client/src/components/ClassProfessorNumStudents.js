import React from 'react'

const NumStudents = (props) => {
    return (
        <div>
            <h1>
                Number of Students
            </h1>
            <hr></hr>
            <p>{props.numStudents}</p>
        </div>
    )
}

export default NumStudents