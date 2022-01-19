import React from 'react'

import './ProfessorClassDetails.css'

const ProfessorClassDetails = (props) => {
    return (
        <div className='class-container'>
                <div className='upper-half' style={{backgroundColor: props.color}}>            
                    <h1 className='class-name'>
                        {props.name} <span style={{color: 'white'}} onClick={props.onClick}>X</span>
                    </h1>
                </div>
                <div className='bottom-half' style={{borderColor: props.color}}>
                    <div className='top-buttons'>
                        <button className='add-button'>
                            Add Staff
                        </button>
                        <button className='remove-button'>
                            Remove Staff
                        </button>
                        <button className='add-button'>
                            Add Student
                        </button>
                        <button className='remove-button'>
                            Remove Student
                        </button>
                    </div>
                    <div>
                        <h1 style={{display: 'flex', justifyContent: 'space-between'}}>
                            Assignments
                            <button className='edit-assignments'>Edit Assignments</button>
                        </h1>
                        <hr></hr>
                        {props.assignments.map((assignment) => {
                            if (assignment.graded){
                                return (
                                    <li style={{display: 'flex', justifyContent: 'space-between'}}>{assignment.name} <span>GRADED</span></li>
                                )
                            }
                            else{
                                return (
                                    <li style={{display: 'flex', justifyContent: 'space-between'}}>{assignment.name} <span><button>GRADE</button></span></li>
                                )
                            }
                        })}

                    </div>
                </div>
        </div>
    )
}

export default ProfessorClassDetails
// {props.grades.map((assignment) => <li style={{display: 'flex', justifyContent: 'space-between'}}>{assignment.name} <span>{assignment.grade}</span></li>)}
