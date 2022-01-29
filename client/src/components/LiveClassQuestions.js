import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import React, { useRef, useState } from 'react';
import LiveChat from './LiveChat.js'

import './LiveClassQuestions.css'

const ClassQuestions = (props) => {
    return (
        <div ref={props.ref} className='live-questions-container'>
            <div className='title'>
                Class Questions
            </div>
            <LiveChat />
        </div>
    )
}

export default ClassQuestions