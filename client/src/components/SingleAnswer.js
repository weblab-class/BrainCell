import React, { useState, useEffect } from 'react'

import { get, post } from "../utilities";

const SingleAnswer = (props) => {

    return (
        <div>
            <div style={{display: 'flex', padding: '8px'}}>
                A: {props.answer}
            </div>
            <hr></hr>
        </div>
    )
}

export default SingleAnswer