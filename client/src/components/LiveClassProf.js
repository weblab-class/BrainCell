import React from 'react'
import LiveChat from './LiveChat.js'

import './LiveClassProf.css'

const LiveClassProf = () => {
    return (
        <div>
            <div className='slides-questions-container'>
                <div className='slides'>
                    Lecture Slides
                </div>                
                <div className='live-questions-container'>
                    <div className='title'>
                        Class Questions
                    </div>
                    <LiveChat />
                </div>
            </div>
            <div className='buttons-container'>
                <div>
                    <button className='slides-button'>
                        Back
                    </button>
                    <button className='slides-button'>
                        Next
                    </button>
                </div>
                <button className='end-session-button'>
                    END SESSION
                </button>
            </div>
        </div>
    )
}

export default LiveClassProf