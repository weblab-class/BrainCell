import React from 'react'
import LiveChat from './LiveChat.js'

import './LiveClassQuestions.css'

const ClassQuestions = () => {
    return (
        <div className='live-questions-container'>
            <div className='title'>
                Class Questions
            </div>
            <LiveChat />
        </div>
    )
}

export default ClassQuestions