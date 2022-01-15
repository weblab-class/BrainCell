import React from "react";

import Class from './Class.js'

// assignment = {name: String, instructions: String, dueDate: Date}
// Date --> year, month, day, hour, mingute, second, millisecond

const Overview = () => {
    return (
        <div>
            <Class name='6.148: WebLab' assignment={{name: 'Milestone 1', instructions: 'None', dueDate: new Date (2022, 0, 20)}} grade='A' color='blue' />
            <Class name='6.042: Mathematics for Computer Science' assignment={{name: 'Pset 3', instructions: 'None', dueDate: new Date(2022, 0, 21)}} grade='B' color='red'/>
            <Class name='6.009: Fundamentals of Programming' assignment={{name: 'Lab 3', instructions: 'None', dueDate: new Date(2022, 0, 22)}} grade='A' color='green'/>
            <Class name='18.02: Multivariable Calculus' assignment={{name: 'Pset 3', instructions: 'None', dueDate: new Date(2022, 0, 23)}} grade='C' color='orange'/>
        </div>
    )
}

export default Overview