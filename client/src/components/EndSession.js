import React from 'react'

const EndSession = (props) => {
    return (
        <button className='end-session-button' onClick={props.onClick}>
            END SESSION
        </button>
    )
}

export default EndSession