import React, { useState } from 'react'
import ProfessorButtons from './ProfessorButtons.js'
import ProfessorAssignments from './ProfessorAssignments.js'
import Schedule from './EditSchedule.js'

import './ProfessorClassDetails.css'

const ProfessorClassDetails = (props) => {

    const [addingStaff, setAddingStaff] = useState(false)
    const [removingStaff, setRemovingStaff] = useState(false)
    const [addingStudent, setAddingStudent] = useState(false)
    const [removingStudent, setRemovingStudent] = useState(false)
    const [editingSchedule, setEditingSchedule] = useState(false)
    const [buttonClicked, setButtonClicked] = useState(false)
    const [buttonTitle, setButtonTitle] = useState('')

    const addStaff = () => {
        if (removingStaff) {
            setRemovingStaff(false)
        }
        else if (addingStudent) {
            setAddingStudent(false)
        }
        else if (removingStudent) {
            setRemovingStudent(false)
        }
        else if (editingSchedule) {
            setEditingSchedule(false)
        }

        if (addingStaff){
            setAddingStaff(false)
            setButtonClicked(false)
        }
        else{
            setAddingStaff(true)
            setButtonClicked(true)
        }

        setButtonTitle('Add Staff Member')
    }

    const removeStaff = () => {
        if (addingStaff) {
            setAddingStaff(false)
        }
        else if (addingStudent) {
            setAddingStudent(false)
        }
        else if (removingStudent) {
            setRemovingStudent(false)
        }
        else if (editingSchedule) {
            setEditingSchedule(false)
        }

        if (removingStaff){
            setRemovingStaff(false)
            setButtonClicked(false)
        }
        else{
            setRemovingStaff(true)
            setButtonClicked(true)
        }

        setButtonTitle('Remove Staff Member')
    }

    const addStudent = () => {
        if (addingStaff) {
            setAddingStaff(false)
        }
        else if (removingStaff) {
            setRemovingStaff(false)
        }
        else if (removingStudent) {
            setRemovingStudent(false)
        }
        else if (editingSchedule) {
            setEditingSchedule(false)
        }

        if (addingStudent){
            setAddingStudent(false)
            setButtonClicked(false)
        }
        else{
            setAddingStudent(true)
            setButtonClicked(true)
        }

        setButtonTitle('Add Student')
    }

    const removeStudent = () => {
        if (addingStaff) {
            setAddingStaff(false)
        }
        else if (removingStaff) {
            setRemovingStaff(false)
        }
        else if (addingStudent) {
            setAddingStudent(false)
        }
        else if (editingSchedule) {
            setEditingSchedule(false)
        }

        if (removingStudent){
            setRemovingStudent(false)
            setButtonClicked(false)
        }
        else{
            setRemovingStudent(true)
            setButtonClicked(true)
        }

        setButtonTitle('Remove Student')
    }

    const editSchedule = () => {
        if (addingStaff) {
            setAddingStaff(false)
        }
        else if (removingStaff) {
            setRemovingStaff(false)
        }
        else if (addingStudent) {
            setAddingStudent(false)
        }
        else if (removingStudent){
            setRemovingStudent(false)
        }
        
        if(editingSchedule){
            setEditingSchedule(false)
            setButtonClicked(false)
        }
        else{
            setEditingSchedule(true)
            setButtonClicked(true)
        }

        setButtonTitle('Schedule')
    }

    return (
        <div className='class-container'>
                <div className='upper-half' style={{backgroundColor: props.color}}>            
                    <h1 className='class-name'>
                        {props.name} <span style={{color: 'white'}} onClick={props.onClick}>X</span>
                    </h1>
                </div>
                <div className='bottom-half' style={{borderColor: props.color}}>
                    <div className='top-buttons'>
                        <button className='add-button' onClick={addStaff}>
                            Add Staff
                        </button>
                        <button className='remove-button' onClick={removeStaff}>
                            Remove Staff
                        </button>
                        <button className='add-button' onClick={addStudent}>
                            Add Student
                        </button>
                        <button className='remove-button' onClick={removeStudent}>
                            Remove Student
                        </button>
                        <button className='schedule-button' onClick={editSchedule}>
                            Edit Schedule
                        </button>
                    </div>

                    {buttonClicked ? (
                        editingSchedule ? (
                            <Schedule title={buttonTitle} courseId={props.courseId}/>
                        ) : (
                        <ProfessorButtons title={buttonTitle} courseId={props.courseId} addingStaff={addingStaff} removingStaff={removingStaff}
                        addingStudent={addingStudent} removingStudent={removingStudent} />)
                    ) : (
                        (null)
                    )}

                    <ProfessorAssignments courseId={props.courseId} students={props.students} assignments={props.assignments} />
                </div>
        </div>
    )
}

export default ProfessorClassDetails
